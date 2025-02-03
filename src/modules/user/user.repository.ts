import { Injectable } from '@nestjs/common';
import DBClient from 'src/providers/database/prisma/DB.client';
import UserMapper from '../../common/domains/user/user.mapper';
import { MakerOrderBy, MakerOrderByField, UserProperties } from '../../common/types/user/user.types';
import { DreamerProfileProperties, MakerProfileProperties } from '../../common/types/user/profile.types';
import { DreamerProfileMapper, MakerProfileMapper } from '../../common/domains/user/profile.mapper';
import { IUser } from '../../common/domains/user/user.interface';
import { IDreamerProfile, IMakerProfile } from '../../common/domains/user/profile.interface';
import { RoleEnum } from 'src/common/constants/role.type';
import SortOrder from 'src/common/constants/sortOrder.enum';
import { GetMakerListQueryDTO } from 'src/common/types/user/query.dto';

@Injectable()
export default class UserRepository {
  constructor(private readonly db: DBClient) {}

  async findByEmail(email: string): Promise<IUser> {
    const data = await this.db.user.findUnique({
      where: {
        email
      }
    });

    return new UserMapper(data).toDomain();
  }

  async findByNickName(nickName: string): Promise<IUser> {
    const data = await this.db.user.findUnique({
      where: {
        nickName
      }
    });

    return new UserMapper(data).toDomain();
  }

  async findById(id: string): Promise<IUser> {
    const data = await this.db.user.findUnique({ where: { id } });

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

  async findMany(options: GetMakerListQueryDTO): Promise<IUser[]> {
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
          { role: RoleEnum.MAKER },
          keyword ? { nickName: { contains: keyword, mode: 'insensitive' } } : {},
          serviceArea ? { makerProfile: { serviceArea: { has: serviceArea } } } : {},
          serviceType ? { makerProfile: { serviceTypes: { has: serviceType } } } : {}
        ]
      },
      include: { makerProfile: true, stats: true },
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
          { role: RoleEnum.MAKER },
          keyword ? { nickName: { contains: keyword, mode: 'insensitive' } } : {},
          serviceArea ? { makerProfile: { serviceArea: { has: serviceArea } } } : {},
          serviceType ? { makerProfile: { serviceTypes: { has: serviceType } } } : {}
        ]
      }
    });
  }

  async create(user: Partial<UserProperties>): Promise<IUser> {
    const data = await this.db.user.create({
      data: {
        role: user.role,
        email: user.email,
        nickName: user.nickName,
        password: user.password,
        phoneNumber: user.phoneNumber
      }
    });

    return new UserMapper(data).toDomain();
  }

  async update(id: string, data: Partial<UserProperties>): Promise<IUser> {
    const user = await this.db.user.update({
      where: {
        id
      },
      data
    });

    return new UserMapper(user).toDomain();
  }

  async createDreamer(user: Partial<DreamerProfileProperties>): Promise<IDreamerProfile> {
    const profile = await this.db.dreamerProfile.create({
      data: {
        user: { connect: { id: user.userId } },
        tripTypes: user.tripTypes,
        serviceArea: user.serviceArea,
        image: user.image
      }
    });

    return new DreamerProfileMapper(profile).toDomain();
  }

  async createMaker(user: Partial<MakerProfileProperties>): Promise<IMakerProfile> {
    const profile = await this.db.makerProfile.create({
      data: {
        user: { connect: { id: user.userId } },
        serviceArea: user.serviceArea,
        serviceTypes: user.serviceTypes,
        gallery: user.gallery,
        description: user.description,
        detailDescription: user.detailDescription,
        image: user.image
      }
    });

    return new MakerProfileMapper(profile).toDomain();
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
