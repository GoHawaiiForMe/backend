import { Prisma, Review } from '@prisma/client';
import PlanOrder from 'src/common/constants/planOrder.enum';
import { Role } from 'src/common/constants/role.type';
import { ServiceArea } from 'src/common/constants/serviceArea.type';
import SortOrder from 'src/common/constants/sortOrder.enum';
import { Status, StatusEnum } from 'src/common/constants/status.type';
import { TripType } from 'src/common/constants/tripType.type';

export type PlanOrderByField = { createdAt: SortOrder.DESC } | { tripDate: SortOrder.ASC };

export interface PlanWhereConditions {
  isDeletedAt: Date | null;
  serviceArea?: { in: ServiceArea[] };
  tripType?: { in: TripType[] };
  assignees?: { some: { id: string } };
  status?: { in: StatusEnum[] };
  dreamerId?: string;
  OR?: Array<{
    title?: { contains: string; mode: 'insensitive' };
    dreamer?: { nickName?: { contains: string; mode: 'insensitive' } };
  }>;
}
export interface PlanQueryOptions {
  orderBy?: PlanOrder;
  keyword?: string;
  tripType?: TripType[];
  serviceArea?: ServiceArea[];
  page?: number;
  pageSize?: number;
  isAssigned?: boolean;
  status?: StatusEnum[];
  userId?: string;
}

export interface CreatePlanData {
  title: string;
  tripDate: Date;
  tripType: TripType;
  serviceArea: ServiceArea;
  details: string;
  address?: string | null;
  dreamerId?: string | null;
}

export interface UpdatePlanData {
  status?: Status;
  assigneeId?: string;
}

export interface PlanReference {
  id?: string;
  createdAt?: Date;
  tripType?: TripType;
  tripDate?: Date;
  serviceArea?: ServiceArea;
  details?: string;
  status?: Status;
  dreamer?: any; //NOTE. 임시로 any 사용
}
