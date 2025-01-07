import { Injectable } from '@nestjs/common';
import FollowRepository from './follow.repository';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/enums/error.message';
import Follow from './domain/follow.domain';
import IFollowService from './interface/follow.service.interface';

@Injectable()
export default class FollowService implements IFollowService {
  constructor(private readonly repository: FollowRepository) {}

  // 찜 기능: Dreamer -> Maker
  async create(dreamerId: string, makerId: string): Promise<null> {
    const follow = await this.repository.find(dreamerId, makerId);

    if (follow) {
      throw new BadRequestError(ErrorMessage.FOLLOW_EXIST);
    }

    const data = new Follow({ dreamerId, makerId });
    return await this.repository.create(data);
  }

  async delete(dreamerId: string, makerId: string): Promise<null> {
    const follow = await this.repository.find(dreamerId, makerId);

    if (!follow) {
      throw new BadRequestError(ErrorMessage.FOLLOW_NOT_FOUND);
    }

    return await this.repository.delete(follow[0].id);
  }
}
