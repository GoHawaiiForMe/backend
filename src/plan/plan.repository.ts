import { Injectable } from '@nestjs/common';
import { Plan, Status } from '@prisma/client';
import DBClient from 'prisma/DB.client';
import PlanQueryOptions from './type/planQueryOptions';
import PlanOrderByField from './type/planOrderByField.type';
import PlanOrder from 'src/common/enums/planOrder';
import SortOrder from 'src/common/enums/sortOrder';
import PlanWhereConditions from './type/planWhereCondition.interface';
import CreatePlanData from './type/createPlanData.interface';
import { connect } from 'http2';
import UpdatePlanData from './type/updatePlanData.interface';

@Injectable()
export default class PlanRepository {
  constructor(private readonly db: DBClient) {}

  async findMany(options: PlanQueryOptions): Promise<Plan[]> {
    const { orderBy, keyword, serviceArea, page, pageSize } = options || {};
    const orderByField: PlanOrderByField =
      orderBy === PlanOrder.RECENT ? { createdAt: SortOrder.DESC } : { startDate: SortOrder.ASC };
    const whereConditions: PlanWhereConditions = {
      isDeletedAt: { equals: null },
      serviceArea: { in: serviceArea }
    };
    if (keyword) {
      whereConditions.OR = [{ details: { contains: keyword, mode: 'insensitive' } }];
    } //TODO. 검색조건 상의 필요

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
    const { orderBy, keyword, serviceArea, page, pageSize } = options || {};

    const whereConditions: PlanWhereConditions = {
      isDeletedAt: { equals: null },
      serviceArea: { in: serviceArea }
    };

    if (keyword) {
      whereConditions.OR = [{ details: { contains: keyword, mode: 'insensitive' } }];
    } //TODO. 검색조건 상의 필요

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
        assignees: { select: { id: true, nickName: true, role: true } }
      }
    });
    return plan;
  }

  async create(data: CreatePlanData): Promise<Plan> {
    const { startDate, endDate, tripType, serviceArea, details, address, dreamerId } = data;
    const plan = await this.db.plan.create({
      data: {
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
}
