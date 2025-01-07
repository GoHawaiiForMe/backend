import { Injectable } from '@nestjs/common';
import DBClient from 'prisma/DB.client';
import FollowMapper from './domain/follow.mapper';
import IFollowRepository from './interface/follow.repository.interface';
import { FollowProperties } from './type/follow.types';

@Injectable()
export default class FollowRepository implements IFollowRepository {
  constructor(private readonly db: DBClient) {}

  async find(dreamerId, makerId) {
    const data = await this.db.follow.findMany({
      where: { dreamerId, makerId }
    });

    if (data.length > 0) {
      return data.map((follow) => new FollowMapper(follow).toDomain());
    }
  }

  async create(data: Partial<FollowProperties>): Promise<null> {
    await this.db.follow.create({ data });
    return;
  }

  async delete(id: string): Promise<null> {
    await this.db.follow.delete({ where: { id } });
    return;
  }
}
