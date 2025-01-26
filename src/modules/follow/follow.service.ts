import { Injectable } from '@nestjs/common';
import FollowRepository from './follow.repository';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import Follow from '../../common/domains/follow/follow.domain';
import UserStatsService from '../userStats/userStats.service';
import { GetFollowQueryDTO } from 'src/common/types/follow/follow.dto';
import { FollowProperties } from 'src/common/types/follow/follow.types';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { EventType } from 'src/common/constants/event.type';

@Injectable()
export default class FollowService {
  constructor(
    @InjectQueue('stats') private readonly queue: Queue,
    private readonly repository: FollowRepository,
    private readonly userStats: UserStatsService
  ) {}

  async get(userId: string, options: GetFollowQueryDTO): Promise<{ totalCount: number; list: FollowProperties[] }> {
    const follows = await this.repository.get(userId, options);

    const list = await Promise.all(
      follows.map(async (follow) => {
        const makerStats = await this.userStats.get(follow.getMakerId());
        const followData = follow.toClient();

        return { ...followData, maker: { ...followData.maker, ...makerStats } };
      })
    );

    const totalCount = await this.repository.count(userId);

    return { totalCount, list };
  }

  // 찜 기능: Dreamer -> Maker
  async create(dreamerId: string, makerId: string): Promise<null> {
    const follow = await this.repository.find(dreamerId, makerId);

    if (follow) {
      throw new BadRequestError(ErrorMessage.FOLLOW_EXIST);
    }

    const data = new Follow({ dreamerId, makerId });
    await this.repository.create(data);

    // 메이커의 UserStats(찜 수) 업데이트 작업을 큐에 추가
    await this.queue.add('stats', {
      userId: makerId,
      event: EventType.FOLLOW,
      isAdd: true
    });

    return;
  }

  async delete(dreamerId: string, makerId: string): Promise<null> {
    const follow = await this.repository.find(dreamerId, makerId);

    if (!follow) {
      throw new BadRequestError(ErrorMessage.FOLLOW_NOT_FOUND);
    }

    await this.repository.delete(follow.getId());

    // 메이커의 UserStats(찜 수) 업데이트 작업을 큐에 추가
    await this.queue.add('stats', {
      userId: makerId,
      event: EventType.FOLLOW,
      isAdd: false
    });

    return;
  }
}
