import { mapToImage, mapToServiceArea, mapToTripType } from 'src/common/utilities/mapToEnum';
import { DreamerProfileMapperProperties, MakerProfileMapperProperties} from '../../types/user/profile.types';
import { DreamerProfile, MakerProfile } from './profile.domain';

export class DreamerProfileMapper {
  constructor(private readonly dreamer: DreamerProfileMapperProperties) {}

  toDomain()  {
    if (!this.dreamer) return null;
    return new DreamerProfile({
      userId: this.dreamer.userId,
      image: mapToImage(this.dreamer.image),
      serviceArea: this.dreamer.serviceArea?.map(serviceArea=> mapToServiceArea(serviceArea)) || [],
      tripTypes: (this.dreamer.tripTypes.map(tripType => mapToTripType(tripType))) || [],
      createdAt: this.dreamer.createdAt,
      updatedAt: this.dreamer.updatedAt
    });
  }
}

export class MakerProfileMapper {
  constructor(private readonly maker: MakerProfileMapperProperties) {}

  toDomain() {
    return new MakerProfile({
      userId: this.maker.userId,
      image: mapToImage(this.maker.image),
      serviceArea: this.maker.serviceArea?.map(serviceArea=> mapToServiceArea(serviceArea)) || [],
      serviceTypes: this.maker.serviceTypes.map(serviceType => mapToTripType(serviceType)) || [],
      gallery: this.maker.gallery,
      description: this.maker.description,
      detailDescription: this.maker.detailDescription,
      createdAt: this.maker.createdAt,
      updatedAt: this.maker.updatedAt
    });
  }
}
