import { ProfileImage, ServiceArea, TripType } from '@prisma/client';

export interface BaseProfile {
  userId?: string;
  image: ProfileImage;
  serviceArea: ServiceArea[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DreamerProfileProperties extends BaseProfile {
  tripTypes: TripType[]; // Dreamer
}

export interface MakerProfileProperties extends BaseProfile {
  serviceTypes: TripType[];
  gallery: string;
  description: string;
  detailDescription: string;
}

export interface MakerInfoAndProfileProperties extends MakerProfileProperties {
  id: string;
  nickName: string;
  averageRating: number;
  totalReviews: number;
  totalFollows: number;
  totalConfirms: number;
}
