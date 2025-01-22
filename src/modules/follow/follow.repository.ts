import { Injectable } from '@nestjs/common';
import DBClient from 'src/providers/database/prisma/DB.client';
import FollowMapper from '../../common/domains/follow/follow.mapper';
import { FollowProperties } from '../../common/types/follow/follow.types';
import IFollow from '../../common/domains/follow/follow.interface';

@Injectable()
export default class FollowRepository {
  constructor(private readonly db: DBClient) {}

  async get(dreamerId: string) {
    const data = await this.db.follow.findMany({
      where: { dreamerId },
      select: {
        id: true,
        makerId: true,
        dreamerId: true,
        maker: {
          select: {
            nickName: true,
            makerProfile: { select: { image: true } },
            followers: {
              where: { dreamerId },
              select: { id: true }
            }
          }
        }
      }
    });
    return data.map((follow) => new FollowMapper(follow).toDomain());
  }

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
