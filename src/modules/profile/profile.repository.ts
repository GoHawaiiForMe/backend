import { Injectable } from '@nestjs/common';
import DBClient from 'src/providers/database/prisma/DB.client';
import { IDreamerProfile, IMakerProfile } from './domain/profile.interface';
import { DreamerProfileMapper, MakerProfileMapper } from './domain/profile.mapper';
import { DreamerProfileProperties, MakerProfileProperties } from './types/profile.types';

@Injectable()
export default class ProfileRepository {
  constructor(private readonly db: DBClient) {}

  async findDreamerProfile(userId: string): Promise<IDreamerProfile> {
    const data = await this.db.dreamerProfile.findUnique({
      where: {
        userId
      }
    });

    return new DreamerProfileMapper(data).toDomain();
  }

  async findMakerProfile(userId: string): Promise<IMakerProfile> {
    const data = await this.db.makerProfile.findUnique({
      where: {
        userId
      }
    });

    return new MakerProfileMapper(data).toDomain();
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
