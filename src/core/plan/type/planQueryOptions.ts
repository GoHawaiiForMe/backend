import { ServiceArea, TripType } from '@prisma/client';
import PlanOrder from 'src/common/enums/planOrder';

export default interface PlanQueryOptions {
  orderBy: PlanOrder;
  keyword?: string;
  tripType: TripType[];
  serviceArea?: ServiceArea[];
  page: number;
  pageSize: number;
}
