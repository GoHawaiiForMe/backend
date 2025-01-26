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
  tripDate?: Date | string | { gte?: Date; lte?: Date };
  quotes?: { some: { makerId: { not: string } } };
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
  tripDate?: Date; //NOTE. 스케줄러를 위한 필드
  serviceArea?: ServiceArea[];
  page?: number;
  pageSize?: number;
  isAssigned?: boolean;
  status?: StatusEnum[];
  userId?: string;
  role?: Role;
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

export interface PlanReference {
  id?: string;
  createdAt?: Date;
  title?: string;
  tripType?: TripType;
  tripDate?: Date;
  serviceArea?: ServiceArea;
  details?: string;
  status?: Status;
  dreamer?: any; //NOTE. 임시로 any 사용
}

export interface AssignData {
  id: string;
  userId?: string;
  assigneeId: string;
  isAssigned?: boolean;
}
