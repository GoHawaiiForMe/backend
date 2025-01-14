import { ServiceArea, TripType } from '@prisma/client';
import PlanOrder from 'src/common/constants/planOrder.enum';

export default interface PlanQueryOptions {
  orderBy: PlanOrder;
  keyword?: string;
  tripType: TripType[];
  serviceArea?: ServiceArea[];
  page: number;
  pageSize: number;
}
