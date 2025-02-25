import ErrorMessage from 'src/common/constants/errorMessage.enum';
import BadRequestError from 'src/common/errors/badRequestError';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import UserStatsService from '../userStats/userStats.service';
import { FilteredAuthProperties, OAuthProperties, AuthProperties } from 'src/modules/auth/types/auth.types';
import AuthRepository from './auth.repository';
import { Role } from 'src/common/constants/role.type';
import { DreamerProfileProperties, MakerProfileProperties } from 'src/modules/profile/types/profile.types';
import { OAuthProvider } from 'src/common/constants/oauth.type';
import UnauthorizedError from 'src/common/errors/unauthorizedError';
import ProfileService from '../profile/profile.service';
import Auth from './domain/auth.domain';

@Injectable()
export default class AuthService {
  constructor(
    private readonly repository: AuthRepository,
    private readonly jwt: JwtService,
    private readonly profile: ProfileService,
    private readonly userStats: UserStatsService
  ) {}

  async createUser(user: AuthProperties, profile: DreamerProfileProperties | MakerProfileProperties): Promise<null> {
    // 유저 등록: 소셜 로그인의 경우 이메일이 없어 중복 확인 패스
    const { provider, providerId } = user;

    if (providerId) {
      const existingUser = await this.repository.findByProvider({ provider, providerId });
      if (existingUser) {
        throw new BadRequestError(ErrorMessage.USER_OAUTH_EXIST);
      }
    } else {
      const existingEmail = await this.repository.findByEmail(user.email);
      if (existingEmail) {
        throw new BadRequestError(ErrorMessage.USER_EXIST);
      }
    }

    const existingNickName = await this.repository.findByNickName(user.nickName);
    if (existingNickName) {
      throw new BadRequestError(ErrorMessage.USER_NICKNAME_EXIST);
    }

    const userData = await Auth.create(user);
    const savedUser = await this.repository.create(userData.signupData());

    await this.profile.createProfile(savedUser.getId(), savedUser.getRole(), profile);

    // 유저 생성시 기본값으로 UserStats 생성
    await this.userStats.create(savedUser.getId(), {});

    return;
  }

  async login(email: string, password: string): Promise<FilteredAuthProperties> {
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

  async socialLogin(
    data: OAuthProperties
  ): Promise<{ accessToken: string; refreshToken: string } | { OAuthToken: string }> {
    const user = await this.repository.findByProvider(data);
    if (!user) return this.createOAuthToken({ provider: data.provider, providerId: data.providerId });

    return this.createTokens({ userId: user.getId(), role: user.getRole() });
  }

  createTokens(payload: { userId: string; role: Role }) {
    const accessToken = this.jwt.sign(payload, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    const refreshToken = this.jwt.sign(payload, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });

    return { accessToken, refreshToken };
  }

  createNewToken(oldToken: string) {
    try {
      const user = this.jwt.verify<{ userId: string; role: Role }>(oldToken);

      return this.createTokens({ userId: user.userId, role: user.role });
    } catch {
      throw new UnauthorizedError(ErrorMessage.TOKEN_UNAUTHORIZED_VALIDATION);
    }
  }

  createOAuthToken(payload: { provider: OAuthProvider; providerId: string }) {
    const OAuthToken = this.jwt.sign(payload, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });

    return { OAuthToken };
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
