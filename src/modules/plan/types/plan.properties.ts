import { ProfileImage } from 'src/common/constants/image.type';
import { ServiceArea } from 'src/common/constants/serviceArea.type';
import { Status } from 'src/common/constants/status.type';
import { TripType } from 'src/common/constants/tripType.type';
import { UserReference } from 'src/modules/user/types/user.types';

export interface PlanProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeletedAt?: Date | null;
  title: string;
  tripDate: Date;
  tripType: TripType;
  serviceArea: ServiceArea;
  details: string;
  address?: string;
  status?: Status;
  quotes?: {
    id?: string;
    makerId?: string;
    isConfirmed?: boolean;
    price?: number;
    maker?: {
      id: string;
      nickName: string;
      image?: ProfileImage;
    };
  }[];
  assignees?: UserReference[];
  assigneeId?: string;
  isAssigned?: boolean;
  dreamer?: UserReference | null;
  dreamerId?: string | null;
}

export interface PlanToClientProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  title: string;
  tripDate: Date;
  tripType: TripType;
  serviceArea: ServiceArea;
  details: string;
  address?: string;
  status: Status;
  assignees: UserReference[];
  dreamer?: UserReference | null;
  quotes?: {
    id?: string;
    price?: number;
    isConfirmed?: boolean;
    maker?: {
      id: string;
      nickName: string;
      image?: ProfileImage;
    };
  }[];
}

export interface PlanMapperProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeletedAt?: Date | null;
  title: string;
  tripDate: Date;
  tripType: TripType;
  serviceArea: ServiceArea;
  details: string;
  address?: string;
  status?: Status;
  quotes?: {
    id?: string;
    makerId?: string;
    isConfirmed?: boolean;
    price?: number;
    maker?: {
      id: string;
      nickName: string;
      makerProfile: { image: ProfileImage };
    };
  }[];
  assignees?: UserReference[];
  dreamer?: UserReference | null;
  dreamerId?: string | null;
}
