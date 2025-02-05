import ErrorMessage from 'src/common/constants/errorMessage.enum';
import BadRequestError from 'src/common/errors/badRequestError';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import User from 'src/common/domains/user/user.domain';
import { DreamerProfile, MakerProfile } from 'src/common/domains/user/profile.domain';
import UserStatsService from '../userStats/userStats.service';
import { FilteredUserProperties } from 'src/common/types/user/user.types';
import AuthRepository from './auth.repository';

@Injectable()
export default class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwt: JwtService,
    private readonly userStats: UserStatsService
  ) {}

  async createUser(data): Promise<null> {
    const { user, profile } = data;

    // FIXME: transaction utility 만들어서 적용하자
    // 유저 등록
    const existingEmail = await this.repository.findByEmail(user.email);
    if (existingEmail) {
      throw new BadRequestError(ErrorMessage.USER_EXIST);
    }

    const existingNickName = await this.repository.findByNickName(user.nickName);
    if (existingNickName) {
      throw new BadRequestError(ErrorMessage.USER_NICKNAME_EXIST);
    }

    const userData = await User.create(user);
    const savedUser = await this.repository.create(userData.get());
    const newUser = savedUser.get();

    // 역할에 따라 프로필 등록
    if (newUser.role === 'DREAMER') {
      const profileData = DreamerProfile.create({ ...profile, userId: newUser.id });
      await this.repository.createDreamer(profileData);
    } else {
      const profileData = MakerProfile.create({ ...profile, userId: newUser.id });
      await this.repository.createMaker(profileData.get());
    }

    // 유저 생성시 기본값으로 UserStats 생성
    await this.userStats.create(savedUser.getId(), {});

    return;
  }

  async login(email: string, password: string): Promise<FilteredUserProperties> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new BadRequestError(ErrorMessage.USER_UNAUTHORIZED_ID);
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new BadRequestError(ErrorMessage.USER_BAD_REQUEST_PW);
    }

    return user.toClient();
  }

  createTokens(payload: { userId: string; role: string }) {
    const accessToken = this.jwt.sign(payload, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    const refreshToken = this.jwt.sign(payload, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

    return { accessToken, refreshToken };
  }

  createNewToken(oldToken: string) {
    const { userId, role } = this.jwt.verify(oldToken);
    return this.createTokens({ userId, role });
  }

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.repository.findByEmail(email);

    return !user;
  }

  async checkNickName(nickName: string): Promise<boolean> {
    const user = await this.repository.findByNickName(nickName);

    return !user;
  }
}
