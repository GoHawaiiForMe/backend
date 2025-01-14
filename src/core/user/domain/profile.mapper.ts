import { DreamerProfileProperties, MakerProfileProperties } from '../type/profile.types';
import { DreamerProfile, MakerProfile } from './profile.domain';

export class DreamerProfileMapper {
  constructor(private readonly dreamer: DreamerProfileProperties) {}

  toDomain() {
    return new DreamerProfile({
      userId: this.dreamer.userId,
      image: this.dreamer.image,
      serviceArea: this.dreamer.serviceArea,
      tripTypes: this.dreamer.tripTypes,
      createdAt: this.dreamer.createdAt,
      updatedAt: this.dreamer.updatedAt
    });
  }
}

export class MakerProfileMapper {
  constructor(private readonly maker: MakerProfileProperties) {}

  toDomain() {
    return new MakerProfile({
      userId: this.maker.userId,
      image: this.maker.image,
      serviceArea: this.maker.serviceArea,
      serviceTypes: this.maker.serviceTypes,
      gallery: this.maker.gallery,
      description: this.maker.description,
      detailDescription: this.maker.detailDescription,
      createdAt: this.maker.createdAt,
      updatedAt: this.maker.updatedAt
    });
  }
}
