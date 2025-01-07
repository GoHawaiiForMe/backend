import { DreamerProfileProperties, MakerProfileProperties } from '../type/profile.types';
import { IDreamerProfile, IMakerProfile } from './profile.interface';
import { ProfileImage } from 'src/common/types/image.type';
import { ServiceArea } from 'src/common/types/serviceArea.type';
import { TripType } from 'src/common/types/tripType.type';

export class DreamerProfile implements IDreamerProfile {
  userId?: string;
  image: ProfileImage;
  serviceArea: ServiceArea[];
  tripTypes?: TripType[];
  createdAt?: Date;
  updatedAt?: Date;

  constructor(profile: DreamerProfileProperties) {
    this.userId = profile?.userId;
    this.image = profile.image;
    this.serviceArea = profile.serviceArea;
    this.tripTypes = profile?.tripTypes;
    this.createdAt = profile?.createdAt;
    this.updatedAt = profile?.updatedAt;
  }

  static create(data: Partial<DreamerProfileProperties>) {
    return new DreamerProfile({
      image: data.image,
      serviceArea: data.serviceArea,
      tripTypes: data.tripTypes,
      userId: data.userId
    });
  }

  update(data: Partial<DreamerProfileProperties>): void {
    this.image = data.image || this.image;
    this.serviceArea = data.serviceArea || this.serviceArea;
    this.tripTypes = data.tripTypes || this.tripTypes;
  }

  get() {
    return {
      userId: this.userId,
      image: this.image,
      serviceArea: this.serviceArea,
      tripTypes: this.tripTypes,
      createAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export class MakerProfile implements IMakerProfile {
  userId?: string;
  image: ProfileImage;
  serviceArea: ServiceArea[];
  serviceTypes?: TripType[];
  gallery?: string;
  description?: string;
  detailDescription?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(profile: MakerProfileProperties) {
    this.userId = profile?.userId;
    this.image = profile.image;
    this.serviceArea = profile.serviceArea;
    this.serviceTypes = profile?.serviceTypes;
    this.gallery = profile?.gallery;
    this.description = profile?.description;
    this.detailDescription = profile?.detailDescription;
    this.createdAt = profile?.createdAt;
    this.updatedAt = profile?.updatedAt;
  }

  static create(data: Partial<MakerProfileProperties>) {
    return new MakerProfile({
      image: data.image,
      serviceArea: data.serviceArea,
      serviceTypes: data.serviceTypes,
      gallery: data.gallery,
      description: data.description,
      detailDescription: data.detailDescription,
      userId: data.userId
    });
  }

  update(data: Partial<MakerProfileProperties>): void {
    this.image = data.image || this.image;
    this.serviceArea = data.serviceArea || this.serviceArea;
    this.serviceTypes = data.serviceTypes || this.serviceTypes;
    this.gallery = data.gallery || this.gallery;
    this.description = data.description || this.description;
    this.detailDescription = data.detailDescription || this.detailDescription;
  }

  get() {
    return {
      image: this.image,
      serviceArea: this.serviceArea,
      serviceTypes: this.serviceTypes,
      gallery: this.gallery,
      description: this.description,
      detailDescription: this.detailDescription,
      createAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
