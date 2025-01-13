import { Injectable } from '@nestjs/common';
import { Plan, Status } from '@prisma/client';
import DBClient from 'prisma/DB.client';
import PlanQueryOptions from './type/planQueryOptions';
import PlanOrderByField from './type/planOrderByField.type';
import PlanOrder from 'src/common/enums/planOrder';
import SortOrder from 'src/common/enums/sortOrder';
import PlanWhereConditions from './type/planWhereCondition.interface';
import CreatePlanData from './type/createPlanData.interface';
import UpdatePlanData from './type/updatePlanData.interface';
import { QuoteProperties } from 'src/quote/type/quoteProperties';

@Injectable()
export default class PlanRepository {
  constructor(private readonly db: DBClient) {}

  async findMany(options: PlanQueryOptions): Promise<Plan[]> {
    const { orderBy, page, pageSize } = options || {};
    const orderByField: PlanOrderByField =
      orderBy === PlanOrder.RECENT ? { createdAt: SortOrder.DESC } : { startDate: SortOrder.ASC };
    const whereConditions = this.buildWhereConditions(options);

    const plans = await this.db.plan.findMany({
      where: whereConditions,
      orderBy: orderByField,
      take: pageSize,
      skip: pageSize * (page - 1),
      include: {
        dreamer: { select: { id: true, nickName: true, role: true } }
      }
    });
    return plans;
  }

  async totalCount(options: PlanQueryOptions): Promise<number> {
    const whereConditions = this.buildWhereConditions(options);

    const totalCount = await this.db.plan.count({
      where: whereConditions
    });
    return totalCount;
  }

  async findById(id: string): Promise<Plan> {
    const plan = await this.db.plan.findUnique({
      where: { id, isDeletedAt: null },
      include: {
        dreamer: { select: { id: true, nickName: true, role: true } },
        assignees: { select: { id: true, nickName: true, role: true } },
        quotes: { select: { id: true } }
      }
    });
    return plan;
  }

  async create(data: CreatePlanData): Promise<Plan> {
    const { title, startDate, endDate, tripType, serviceArea, details, address, dreamerId } = data;
    const plan = await this.db.plan.create({
      data: {
        title,
        startDate,
        endDate,
        tripType,
        serviceArea,
        details,
        address,
        status: Status.PENDING,
        dreamer: { connect: { id: dreamerId } }
      },
      include: {
        dreamer: { select: { id: true, nickName: true, role: true } },
        assignees: { select: { id: true, nickName: true, role: true } }
      }
    });

    return plan;
  }

  async update(id: string, data: UpdatePlanData): Promise<Plan> {
    const { status, assigneeIds } = data;
    const isAssigneeIds = assigneeIds && assigneeIds.length > 0;

    const plan = await this.db.plan.update({
      where: { id },
      data: {
        ...(status && { status }),
        assignees: isAssigneeIds
          ? { connect: assigneeIds.map((assigneeId: string) => ({ id: assigneeId })) }
          : undefined
      },
      include: {
        dreamer: { select: { id: true, nickName: true, role: true } },
        assignees: { select: { id: true, nickName: true, role: true } }
      }
    });

    return plan;
  }

  async delete(id: string): Promise<Plan> {
    const plan = await this.db.plan.update({
      where: { id, isDeletedAt: null },
      data: { isDeletedAt: new Date() }
    });
    return plan;
  }

  private buildWhereConditions(options: PlanQueryOptions): PlanWhereConditions {
    const { keyword, tripType, serviceArea } = options;

    const whereConditions: PlanWhereConditions = {
      isDeletedAt: { equals: null },
      serviceArea: { in: serviceArea }
    };

    if (tripType && tripType.length > 0) {
      whereConditions.tripType = { in: tripType };
    }

    if (keyword) {
      whereConditions.OR = [
        {
          dreamer: {
            nickName: {
              contains: keyword,
              mode: 'insensitive'
            }
          }
        },
        {
          title: {
            contains: keyword,
            mode: 'insensitive'
          }
        }
      ];
    }

    return whereConditions;
  }
}
