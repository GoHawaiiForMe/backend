import { Review } from '@prisma/client';
import { ServiceArea } from 'src/common/constants/serviceArea.type';
import { Status } from 'src/common/constants/status.type';
import { TripType } from 'src/common/constants/tripType.type';
import IQuote from 'src/common/domains/quote/quote.interface';
import { IUser } from 'src/common/domains/user/user.interface';
import { QuoteMapperProperties, QuoteToClientProperties } from 'src/common/types/quote/quoteProperties';
import { FilteredUserProperties, UserProperties } from 'src/common/types/user/user.types';

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
  quotes: IQuote[];
  assignees: IUser[];
  assigneeId?: string;
  isAssigned?: boolean;
  dreamer?: IUser | null;
  dreamerId?: string | null;
  review?: Review;
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
  quotes: QuoteToClientProperties[];
  assignees: FilteredUserProperties[];
  dreamer?: FilteredUserProperties | null;
  review?: Review;
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
  quotes?: QuoteMapperProperties[];
  assignees?: UserProperties[];
  dreamer?: UserProperties | null;
  dreamerId?: string | null;
  review?: Review;
}
