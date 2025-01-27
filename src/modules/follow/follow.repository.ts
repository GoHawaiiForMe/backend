import { Injectable } from '@nestjs/common';
import DBClient from 'src/providers/database/prisma/DB.client';
import FollowMapper from '../../common/domains/follow/follow.mapper';
import IFollow from '../../common/domains/follow/follow.interface';
import { PaginationQueryDTO } from 'src/common/types/user/query.dto';

@Injectable()
export default class FollowRepository {
  constructor(private readonly db: DBClient) {}

  async get(dreamerId: string, options: PaginationQueryDTO): Promise<IFollow[]> {
    const { page, pageSize } = options;

    const data = await this.db.follow.findMany({
      where: { dreamerId },
      take: pageSize,
      skip: pageSize * (page - 1)
    });
    return data.map((follow) => new FollowMapper(follow).toDomain());
  }

  async count(dreamerId: string) {
    return await this.db.follow.count({ where: { dreamerId } });
  }

  async find(dreamerId: string, makerId: string): Promise<IFollow> {
    const data = await this.db.follow.findFirst({
      where: { dreamerId, makerId }
    });

    if (data) {
      return new FollowMapper(data).toDomain();
    }
  }

  async create(data: IFollow): Promise<null> {
    await this.db.follow.create({ data: data.toDB() });
    return;
  }

  async delete(id: string): Promise<null> {
    await this.db.follow.delete({ where: { id } });
    return;
  }
}
