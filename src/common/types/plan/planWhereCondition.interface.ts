import { Prisma, ServiceArea, TripType } from '@prisma/client';

export default interface PlanWhereConditions {
  isDeletedAt: Prisma.DateTimeFilter;
  serviceArea?: { in: ServiceArea[] };
  tripType?: { in: TripType[] };
  OR?: Prisma.PlanWhereInput[];
}
