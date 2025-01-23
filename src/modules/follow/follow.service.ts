import { Injectable } from '@nestjs/common';
import FollowRepository from './follow.repository';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import Follow from '../../common/domains/follow/follow.domain';
import UserStatsService from '../userStats/userStats.service';
import { GetFollowQueryDTO } from 'src/common/types/follow/follow.dto';

@Injectable()
export default class FollowService {
  constructor(
    private readonly repository: FollowRepository,
    private readonly userStats: UserStatsService
  ) {}

  async get(userId: string, options: GetFollowQueryDTO) {
    const follows = await this.repository.get(userId, options);

    const followList = await Promise.all(
      follows.map(async (follow) => {
        const makerStats = await this.userStats.get(follow.getMakerId());
        const followData = follow.toClient();

        return { ...followData, maker: { ...followData.maker, ...makerStats } };
      })
    );

    return followList;
  }

  // 찜 기능: Dreamer -> Maker
  async create(dreamerId: string, makerId: string): Promise<null> {
    const follow = await this.repository.find(dreamerId, makerId);

    if (follow) {
      throw new BadRequestError(ErrorMessage.FOLLOW_EXIST);
    }

    const data = new Follow({ dreamerId, makerId });
    return await this.repository.create(data.toDB());
  }

  async delete(dreamerId: string, makerId: string): Promise<null> {
    const follow = await this.repository.find(dreamerId, makerId);

    if (!follow) {
      throw new BadRequestError(ErrorMessage.FOLLOW_NOT_FOUND);
    }

    return await this.repository.delete(follow.toDB().id);
  }
}
