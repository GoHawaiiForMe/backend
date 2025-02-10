import { Injectable } from '@nestjs/common';
import UserRepository from './user.repository';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { FilteredUserProperties, PasswordProperties, UserProperties } from '../../common/types/user/user.types';
import {
  DreamerProfileProperties,
  MakerInfoAndProfileProperties,
  MakerProfileProperties
} from '../../common/types/user/profile.types';
import UserStatsService from '../userStats/userStats.service';
import FollowService from '../follow/follow.service';
import { GetMakerListQueryDTO, PaginationQueryDTO } from 'src/common/types/user/query.dto';
import { followResponseDTO, ProfileCardResponseDTO } from 'src/common/types/user/user.response.dto';

@Injectable()
export default class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly userStats: UserStatsService,
    private readonly follow: FollowService
  ) {}

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

  async getMakers(
    options: GetMakerListQueryDTO
  ): Promise<{ totalCount: number; list: Partial<MakerInfoAndProfileProperties>[] }> {
    const users = await this.repository.findMany(options);
    const list = users.map((user) => ({ ...user.getWithMakerProfile(true), ...user.getStats() }));
    const totalCount = await this.repository.count(options);

    return { totalCount, list };
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

  async getProfileCardData(makerId: string, dreamerId: string, withDetails?: boolean): Promise<ProfileCardResponseDTO> {
    const user = await this.repository.findByIdWithProfileAndFollow(makerId);
    const userData = user.getWithMakerProfile(withDetails);
    const stats = await this.userStats.get(makerId);

    return {
      ...userData,
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
        const profile = await this.getProfileCardData(follow.makerId, userId, true);
        return { ...follow, maker: { ...profile } };
      })
    );

    return { totalCount, list };
  }
}
