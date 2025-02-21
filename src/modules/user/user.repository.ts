import { Injectable } from '@nestjs/common';
import DBClient from 'src/providers/database/prisma/DB.client';
import UserMapper from './domain/user.mapper';
import { MakerOrderBy, MakerOrderByField, UserProperties } from './types/user.types';
import { DreamerProfileProperties, MakerProfileProperties } from './types/profile.types';
import { DreamerProfileMapper, MakerProfileMapper } from './domain/profile.mapper';
import { IUser } from './domain/user.interface';
import { IDreamerProfile, IMakerProfile } from './domain/profile.interface';
import { RoleValues } from 'src/common/constants/role.type';
import SortOrder from 'src/common/constants/sortOrder.enum';
import { GetMakerListQueryDTO } from 'src/modules/user/types/query.dto';

@Injectable()
export default class UserRepository {
  constructor(private readonly db: DBClient) {}

  async findById(id: string): Promise<IUser> {
    const data = await this.db.user.findUnique({ where: { id } });

    return new UserMapper(data).toDomain();
  }

  async findByNickName(nickName: string): Promise<IUser> {
    const data = await this.db.user.findUnique({ where: { nickName } });

    return new UserMapper(data).toDomain();
  }

  async findByIdWithProfileAndFollow(id: string) {
    const user = await this.db.user.findUnique({
      where: { id },
      select: {
        role: true,
        email: true,
        password: true,
        phoneNumber: true,
        coconut: true,
        nickName: true,
        makerProfile: true,
        followers: { select: { dreamerId: true } }
      }
    });

    return new UserMapper(user).toDomain();
  }

  async findManyMakers(options: GetMakerListQueryDTO): Promise<IUser[]> {
    // 검색어, 지역 필터, 서비스 필터, 정렬(리뷰 많은순, 평점 높은순, 확정 많은순)
    const { page, pageSize, orderBy, serviceArea, serviceType, keyword } = options;

    let sortOption: MakerOrderByField;
    switch (orderBy) {
      case MakerOrderBy.RATINGS:
        sortOption = { stats: { averageRating: SortOrder.DESC } };
        break;
      case MakerOrderBy.CONFIRMS:
        sortOption = { stats: { totalConfirms: SortOrder.DESC } };
        break;
      case MakerOrderBy.REVIEWS:
      default:
        sortOption = { stats: { totalReviews: SortOrder.DESC } };
    }

    const users = await this.db.user.findMany({
      where: {
        AND: [
          { role: RoleValues.MAKER },
          keyword ? { nickName: { contains: keyword, mode: 'insensitive' } } : {},
          serviceArea ? { makerProfile: { serviceArea: { has: serviceArea } } } : {},
          serviceType ? { makerProfile: { serviceTypes: { has: serviceType } } } : {}
        ]
      },
      include: { makerProfile: true, stats: true, followers: { select: { dreamerId: true } } },
      orderBy: sortOption,
      take: pageSize,
      skip: pageSize * (page - 1)
    });

    return users.map((user) => new UserMapper(user).toDomain());
  }

  async count(options: GetMakerListQueryDTO): Promise<number> {
    const { serviceArea, serviceType, keyword } = options;

    return await this.db.user.count({
      where: {
        AND: [
          { role: RoleValues.MAKER },
          keyword ? { nickName: { contains: keyword, mode: 'insensitive' } } : {},
          serviceArea ? { makerProfile: { serviceArea: { has: serviceArea } } } : {},
          serviceType ? { makerProfile: { serviceTypes: { has: serviceType } } } : {}
        ]
      }
    });
  }

  async update(data: IUser): Promise<IUser> {
    const user = await this.db.user.update({
      where: {
        id: data.getId()
      },
      data: data.toDB()
    });

    return new UserMapper(user).toDomain();
  }

  async findDreamerProfile(userId: string): Promise<IDreamerProfile> {
    const data = await this.db.dreamerProfile.findUnique({
      where: {
        userId
      }
    });

    if (data) {
      return new DreamerProfileMapper(data).toDomain();
    }
  }

  async findMakerProfile(userId: string): Promise<IMakerProfile> {
    const data = await this.db.makerProfile.findUnique({
      where: {
        userId
      }
    });

    if (data) {
      return new MakerProfileMapper(data).toDomain();
    }
  }

  async updateDreamerProfile(userId: string, data: Partial<DreamerProfileProperties>): Promise<IDreamerProfile> {
    const profile = await this.db.dreamerProfile.update({
      where: {
        userId
      },
      data
    });

    return new DreamerProfileMapper(profile).toDomain();
  }

  async updateMakerProfile(userId: string, data: Partial<MakerProfileProperties>): Promise<IMakerProfile> {
    const profile = await this.db.makerProfile.update({
      where: {
        userId
      },
      data
    });

    return new MakerProfileMapper(profile).toDomain();
  }
}
