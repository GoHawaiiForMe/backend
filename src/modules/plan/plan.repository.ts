import { Injectable } from '@nestjs/common';
import PlanOrder from 'src/common/constants/planOrder.enum';
import SortOrder from 'src/common/constants/sortOrder.enum';
import { StatusEnum } from 'src/common/constants/status.type';
import IPlan from 'src/common/domains/plan/plan.interface';
import PlanMapper from 'src/common/domains/plan/plan.mapper';
import { CreatePlanData, PlanWhereConditions, UpdatePlanData } from 'src/common/types/plan/plan.type';
import { PlanOrderByField } from 'src/common/types/plan/plan.type';
import { PlanQueryOptions } from 'src/common/types/plan/plan.type';
import DBClient from 'src/providers/database/prisma/DB.client';

@Injectable()
export default class PlanRepository {
  constructor(private readonly db: DBClient) {}

  async findMany(options: PlanQueryOptions): Promise<IPlan[]> {
    const { orderBy, page, pageSize } = options || {};

    const whereConditions = this.buildWhereConditions(options);
    const orderByField: PlanOrderByField =
      orderBy === PlanOrder.RECENT ? { createdAt: SortOrder.DESC } : { tripDate: SortOrder.ASC };

    const plans = await this.db.plan.findMany({
      where: whereConditions,
      orderBy: orderByField,
      take: pageSize,
      skip: pageSize * (page - 1),
      include: {
        dreamer: true,
        assignees: true,
        quotes: true
      }
    });
    const domainPlans = plans.map((plan) => new PlanMapper(plan).toDomain());
    return domainPlans;
  }

  async totalCount(options: PlanQueryOptions): Promise<number> {
    const whereConditions = this.buildWhereConditions(options);

    const totalCount = await this.db.plan.count({
      where: whereConditions
    });

    return totalCount;
  }

  async findById(id: string): Promise<IPlan> {
    const plan = await this.db.plan.findUnique({
      where: { id, isDeletedAt: null },
      include: {
        dreamer: true,
        assignees: true,
        quotes: true
      }
    });
    const domainPlan = new PlanMapper(plan).toDomain();
    return domainPlan;
  }

  async create(data: IPlan): Promise<IPlan> {
    const { title, tripDate, tripType, serviceArea, details, address, status, dreamerId } = data.toDB();
    const plan = await this.db.plan.create({
      data: {
        title,
        tripDate,
        tripType,
        serviceArea,
        details,
        address,
        status,
        dreamer: { connect: { id: dreamerId } }
      },
      include: {
        dreamer: true,
        assignees: true,
        quotes: true
      }
    });

    const domainPlan = new PlanMapper(plan).toDomain();
    return domainPlan;
  }

  async update(data: IPlan): Promise<IPlan> {
    const { id, status, assigneeId } = data.toDB();
    const plan = await this.db.plan.update({
      where: { id },
      data: {
        ...(status && { status }),
        assignees: assigneeId ? { connect: { id: assigneeId } } : undefined
      },
      include: {
        dreamer: true,
        assignees: true,
        quotes: true
      }
    });

    const domainPlan = new PlanMapper(plan).toDomain();
    return domainPlan;
  }

  async delete(id: string): Promise<IPlan> {
    const plan = await this.db.plan.update({
      where: { id, isDeletedAt: null },
      data: { isDeletedAt: new Date() },
      include: {
        dreamer: true,
        assignees: true,
        quotes: true
      }
    });

    const domainPlan = new PlanMapper(plan).toDomain();
    return domainPlan;
  }

  private buildWhereConditions(whereOptions: PlanQueryOptions): PlanWhereConditions {
    const { keyword, tripType, serviceArea, isAssigned, userId } = whereOptions;
    const whereConditions: any = {
      isDeletedAt: null,
      serviceArea: { in: serviceArea }
    };
    if (tripType) whereConditions.tripType = { in: tripType };

    if (isAssigned === true) whereConditions.assignees = { some: { id: userId } };

    if (keyword) {
      whereConditions.OR = [
        {
          title: {
            contains: keyword,
            mode: 'insensitive' // 대소문자 구분 없이 검색
          }
        },
        {
          dreamer: {
            nickName: {
              contains: keyword,
              mode: 'insensitive' // 대소문자 구분 없이 검색
            }
          }
        }
      ];
    }

    return whereConditions;
  }
}
