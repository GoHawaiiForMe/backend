import { ServiceArea } from '@prisma/client';
import PlanOrder from 'src/common/enums/planOrder';

export default interface PlanQueryOptions {
  orderBy: PlanOrder;
  keyword?: string;
  serviceArea?: ServiceArea[];
  page: number;
  pageSize: number;
  dreamerId: string;
}
