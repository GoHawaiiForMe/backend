import { Prisma, Review } from '@prisma/client';
import PlanOrder from 'src/common/constants/planOrder.enum';
import { ServiceArea } from 'src/common/constants/serviceArea.type';
import SortOrder from 'src/common/constants/sortOrder.enum';
import { Status } from 'src/common/constants/status.type';
import { TripType } from 'src/common/constants/tripType.type';

export type PlanOrderByField = { createdAt: SortOrder.DESC } | { tripDate: SortOrder.ASC };

export interface PlanWhereConditions {
  isDeletedAt: Date | null;
  serviceArea?: { in: ServiceArea[] };
  tripType?: { in: TripType[] };
  assignees?: { some: { id: string } };
  OR?: PlanWhereConditions[]; // OR 조건을 배열로 추가
}
export interface PlanQueryOptions {
  orderBy?: PlanOrder;
  keyword?: string;
  tripType: TripType[];
  serviceArea?: ServiceArea[];
  page?: number;
  pageSize?: number;
  isAssigned?: boolean;
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
