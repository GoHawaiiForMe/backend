import { ProfileImage } from 'src/common/constants/image.type';
import { ServiceArea } from 'src/common/constants/serviceArea.type';
import { TripType } from 'src/common/constants/tripType.type';

export interface BaseProfile {
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface DreamerProfileMapperProperties extends BaseProfile {
  image: string;
  serviceArea: string[];
  tripTypes: string[]
}

export interface DreamerProfileProperties extends BaseProfile {
  image: ProfileImage
  serviceArea: ServiceArea[];
  tripTypes: TripType[]; // Dreamer
}

export interface MakerProfileMapperProperties extends BaseProfile {
  image: string;
  serviceArea: string[];
  serviceTypes: string[];
  gallery: string;
  description: string;
  detailDescription: string;
}

export interface MakerProfileProperties extends BaseProfile {
  image: ProfileImage
  serviceArea: ServiceArea[];
  serviceTypes: TripType[];
  gallery: string;
  description: string;
  detailDescription: string;
}
