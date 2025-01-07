import { Prisma, ServiceArea } from '@prisma/client';

export default interface PlanWhereConditions {
  isDeletedAt: Prisma.DateTimeFilter;
  serviceArea?: { in: ServiceArea[] };
  OR?: Prisma.PlanWhereInput[];
}
