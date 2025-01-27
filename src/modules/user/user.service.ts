import { Injectable } from '@nestjs/common';
import UserRepository from './user.repository';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import User from '../../common/domains/user/user.domain';
import { JwtService } from '@nestjs/jwt';
import { DreamerProfile, MakerProfile } from '../../common/domains/user/profile.domain';
import { FilteredUserProperties, PasswordProperties, UserProperties } from '../../common/types/user/user.types';
import { DreamerProfileProperties, MakerProfileProperties } from '../../common/types/user/profile.types';
import UserStatsService from '../userStats/userStats.service';
import { RoleEnum } from 'src/common/constants/role.type';
import FollowService from '../follow/follow.service';
import { PaginationQueryDTO } from 'src/common/types/user/query.dto';
import { followResponseDTO, ProfileCardResponseDTO } from 'src/common/types/user/user.response.dto';

@Injectable()
export default class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly jwt: JwtService,
    private readonly userStats: UserStatsService,
    private readonly follow: FollowService
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

  async getUser(userId: string): Promise<Omit<UserProperties, 'password'>> {
    const user = await this.repository.findById(userId);

    return user.toClientAll();
  }

  async getProfile(role: string, userId: string): Promise<DreamerProfileProperties | MakerProfileProperties> {
    if (role === 'DREAMER') {
      const profile = await this.repository.findDreamerProfile(userId);
      return profile.get();
    }

    const profile = await this.repository.findMakerProfile(userId);
    return profile.get();
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

  async updateUser(
    userId: string,
    data: Partial<UserProperties> & PasswordProperties
  ): Promise<FilteredUserProperties> {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new BadRequestError(ErrorMessage.USER_NOT_FOUND);
    }

    await user.update(data);
    const newUser = await this.repository.update(userId, user.get());
    return newUser.toClient();
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

  async checkEmail(email: string): Promise<boolean> {
    const user = await this.repository.findByEmail(email);

    return !user;
  }

  async checkNickName(nickName: string): Promise<boolean> {
    const user = await this.repository.findByNickName(nickName);

    return !user;
  }

  async getProfileCardData(makerId: string, dreamerId: string): Promise<ProfileCardResponseDTO> {
    const user = await this.repository.findByIdWithProfileAndFollow(makerId);
    const userData = user.get();
    const profile = (await this.getProfile(RoleEnum.MAKER, makerId)) as MakerProfileProperties;
    const stats = await this.userStats.get(makerId);

    return {
      nickName: userData.nickName,
      image: profile.image,
      gallery: profile.gallery,
      serviceTypes: profile.serviceTypes,
      isFollowed: user.isFollowed(dreamerId),
      ...stats
    };
  }

  async getFollows(
    userId: string,
    options: PaginationQueryDTO
  ): Promise<{ totalCount: number; list: followResponseDTO[] }> {
    const { totalCount, followData } = await this.follow.get(userId, options);
    const list = await Promise.all(
      followData.map(async (follow) => {
        const profile = await this.getProfileCardData(follow.makerId, userId);
        return { ...follow, maker: { ...profile } };
      })
    );

    return { totalCount, list };
  }
}
