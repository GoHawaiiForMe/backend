import { Injectable } from '@nestjs/common';
import UserRepository from './user.repository';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/enums/error.message';
import User from './domain/user.domain';
import { JwtService } from '@nestjs/jwt';
import { DreamerProfile, MakerProfile } from './domain/profile.domain';
import { FilteredUserProperties, UserProperties } from './type/user.types';
import { DreamerProfileProperties, MakerProfileProperties } from './type/profile.types';

@Injectable()
export default class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwt: JwtService
  ) {}

  async createUser(data): Promise<null> {
    // 데이터 받는 형식을 프론트엔드와 다시 한 번 상의 필요
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
    return;
  }

  async login(email: string, password: string): Promise<FilteredUserProperties> {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new BadRequestError(ErrorMessage.USER_UNAUTHORIZED_ID);
    }

    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new BadRequestError(ErrorMessage.USER_UNAUTHORIZED_PW);
    }

    return user.toClient();
  }

  async getUser(userId: string): Promise<FilteredUserProperties> {
    const user = await this.repository.findById(userId);

    return user.toClient();
  }

  async getProfile(role: string, userId: string): Promise<DreamerProfileProperties | MakerProfileProperties> {
    if (role === 'DREAMER') {
      const profile = await this.repository.findDreamerProfile(userId);
      return profile.get();
    }

    const profile = await this.repository.findMakerProfile(userId);
    return profile.get();
  }

  createToken(userId: string, type?: string): string {
    // FIXME: 토큰 생성 부분 수정 예정
    const payload = { userId };
    const options = {
      expiresIn: type === process.env.TOKEN_NAME ? process.env.ACCESS_TOKEN_EXPIRY : process.env.REFRESH_TOKEN_EXPIRY
    };

    return this.jwt.sign(payload, options);
  }

  getPayload(refreshToken: string): string {
    const { userId } = this.jwt.verify(refreshToken);
    return userId;
  }

  async updateUser(userId: string, data: Partial<UserProperties>): Promise<FilteredUserProperties> {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new BadRequestError(ErrorMessage.USER_NOT_FOUND);
    }

    const newUser = await this.repository.update(userId, user.update(data));
    return newUser.get();
  }

  async updateDreamerProfile(
    userId: string,
    data: Partial<DreamerProfileProperties>
  ): Promise<DreamerProfileProperties> {
    const profile = await this.repository.findDreamerProfile(userId);
    if (!profile) {
      throw new BadRequestError(ErrorMessage.USER_NOT_FOUND);
    }

    const newProfile = await this.repository.updateDreamerProfile(userId, profile.update(data));
    return newProfile.get();
  }

  async updateMakerProfile(userId: string, data: Partial<MakerProfileProperties>): Promise<MakerProfileProperties> {
    const profile = await this.repository.findMakerProfile(userId);
    if (!profile) {
      throw new BadRequestError(ErrorMessage.USER_NOT_FOUND);
    }

    const newProfile = await this.repository.updateMakerProfile(userId, profile.update(data));
    return newProfile.get();
  }
}