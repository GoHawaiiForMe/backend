import { Injectable } from '@nestjs/common';
import UserRepository from './user.repository';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { FilteredUserProperties, PasswordProperties, UserProperties } from './types/user.types';
import { MakerInfoAndProfileProperties } from '../profile/types/profile.types';
import UserStatsService from '../userStats/userStats.service';
import FollowService from '../follow/follow.service';
import { GetMakerListQueryDTO, PaginationQueryDTO } from 'src/modules/user/types/query.dto';
import { followResponseDTO, ProfileCardResponseDTO } from 'src/modules/user/types/user.response.dto';

@Injectable()
export default class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly userStats: UserStatsService,
    private readonly follow: FollowService
  ) {}

  async getUser(userId: string): Promise<Omit<UserProperties, 'password'>> {
    const user = await this.repository.findById(userId);

    return user?.toClientAll();
  }

  async getMakers(
    options: GetMakerListQueryDTO,
    userId?: string
  ): Promise<{ totalCount: number; list: Partial<MakerInfoAndProfileProperties>[] }> {
    const users = await this.repository.findManyMakers(options);
    const list = users.map((user) => ({
      ...user.getWithMakerProfile(true),
      isFollowed: user.isFollowed(userId),
      ...user.getStats()
    }));

    const totalCount = await this.repository.count(options);

    return { totalCount, list };
  }

  async updateUser(
    userId: string,
    data: Partial<UserProperties & PasswordProperties>
  ): Promise<FilteredUserProperties> {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new BadRequestError(ErrorMessage.USER_NOT_FOUND);
    }

    if (data.nickName && data.nickName !== user.getNickName()) {
      const existNickName = await this.repository.findByNickName(data.nickName);
      if (existNickName) {
        throw new BadRequestError(ErrorMessage.USER_NICKNAME_EXIST);
      }
    }

    await user.update(data);
    const newUser = await this.repository.update(user);
    return newUser.toClient();
  }

  async getProfileCardData(makerId: string, dreamerId: string, withDetails?: boolean): Promise<ProfileCardResponseDTO> {
    const user = await this.repository.findByIdWithProfileAndFollow(makerId);

    if (!user) {
      throw new BadRequestError(ErrorMessage.USER_NOT_FOUND);
    }

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
