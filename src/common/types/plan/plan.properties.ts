import { ServiceArea } from 'src/common/constants/serviceArea.type';
import { Status } from 'src/common/constants/status.type';
import { TripType } from 'src/common/constants/tripType.type';
import { UserReference } from 'src/common/types/user/user.types';

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
  status: Status;
  quotes?: { id: string; makerId?: string }[];
  assignees: UserReference[];
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
  quotes?: { id: string; makerId?: string }[];
  assignees: UserReference[];
  dreamer?: UserReference | null;
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
  quotes?: { id: string; makerId?: string }[];
  assignees?: UserReference[];
  dreamer?: UserReference | null;
  dreamerId?: string | null;
}
