import { Injectable } from '@nestjs/common';
import ProfileRepository from './profile.repository';
import { DreamerProfileProperties, MakerProfileProperties } from './types/profile.types';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { Role, RoleValues } from 'src/common/constants/role.type';
import { DreamerProfile, MakerProfile } from './domain/profile.domain';

@Injectable()
export default class ProfileService {
  constructor(private readonly repository: ProfileRepository) {}

  async getProfile(role: string, userId: string): Promise<DreamerProfileProperties | MakerProfileProperties> {
    if (role === 'DREAMER') {
      const profile = await this.repository.findDreamerProfile(userId);
      return profile.get();
    }

    const profile = await this.repository.findMakerProfile(userId);
    return profile.get();
  }

  async createProfile(
    userId: string,
    role: Role,
    data: DreamerProfileProperties | MakerProfileProperties
  ): Promise<null> {
    // 역할에 따라 프로필 등록
    if (role === RoleValues.DREAMER) {
      const profileData = DreamerProfile.create({ ...data, userId });
      await this.repository.createDreamer(profileData);
    } else {
      const profileData = MakerProfile.create({ ...data, userId });
      await this.repository.createMaker(profileData.get());
    }

    return;
  }

  async updateDreamerProfile(
    userId: string,
    data: Partial<DreamerProfileProperties>
  ): Promise<DreamerProfileProperties> {
    const profile = await this.repository.findDreamerProfile(userId);
    if (!profile) {
      throw new BadRequestError(ErrorMessage.USER_NOT_FOUND);
    }

    const newProfile = await this.repository.updateDreamerProfile(userId, profile.update(data));
    return newProfile.get();
  }

  async updateMakerProfile(userId: string, data: Partial<MakerProfileProperties>): Promise<MakerProfileProperties> {
    const profile = await this.repository.findMakerProfile(userId);
    if (!profile) {
      throw new BadRequestError(ErrorMessage.USER_NOT_FOUND);
    }

    const newProfile = await this.repository.updateMakerProfile(userId, profile.update(data));
    return newProfile.get();
  }
}
