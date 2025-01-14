import { Injectable } from '@nestjs/common';
import DBClient from 'prisma/DB.client';
import FollowMapper from './domain/follow.mapper';
import { FollowProperties } from './type/follow.types';
import IFollow from './domain/follow.interface';

@Injectable()
export default class FollowRepository {
  constructor(private readonly db: DBClient) {}

  async find(dreamerId: string, makerId: string): Promise<IFollow> {
    const data = await this.db.follow.findFirst({
      where: { dreamerId, makerId }
    });

    if (data) {
      return new FollowMapper(data).toDomain();
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
