import { Injectable } from '@nestjs/common';
import PlanOrder from 'src/common/constants/planOrder.enum';
import { RoleEnum } from 'src/common/constants/role.type';
import SortOrder from 'src/common/constants/sortOrder.enum';
import { TRIP_TYPE } from 'src/common/constants/tripType.type';
import IPlan from 'src/common/domains/plan/plan.interface';
import PlanMapper from 'src/common/domains/plan/plan.mapper';
import { GroupByCount } from 'src/common/types/plan/plan.dto';
import { PlanWhereConditions } from 'src/common/types/plan/plan.type';
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
        assignees: true
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

  async groupByCount(options: PlanQueryOptions): Promise<GroupByCount> {
    const groupByField = TRIP_TYPE;
    const whereConditions = this.buildWhereConditions(options);

    const groupByCount = await this.db.plan.groupBy({
      by: [groupByField],
      where: whereConditions,
      _count: { id: true }
    });

    const formattedGroupByCount = groupByCount.map((group) => ({
      tripType: group.tripType,
      count: group._count.id
    }));

    return formattedGroupByCount;
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
    const { id, status, assigneeId, isAssigned } = data.toDB();
    const plan = await this.db.plan.update({
      where: { id },
      data: {
        ...(status && { status }),
        assignees: assigneeId
          ? isAssigned
            ? { connect: { id: assigneeId } }
            : { disconnect: { id: assigneeId } }
          : undefined
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
    const { keyword, tripDate, tripType, serviceArea, isAssigned, userId, status, role } = whereOptions;

    const whereConditions: PlanWhereConditions = {
      isDeletedAt: null
    };

    if (tripDate) {
      whereConditions.tripDate = { lte: tripDate };
      whereConditions.status = { in: status };
    } //NOTE.스케줄러 조건

    if (serviceArea) whereConditions.serviceArea = { in: serviceArea };

    if (tripType) whereConditions.tripType = { in: tripType };

    if (role === RoleEnum.MAKER) {
      whereConditions.status = { in: status }; //NOTE. Maker 전용 api 조건
      whereConditions.quotes = { some: { makerId: { not: userId } } };
    } else if (status && userId) {
      whereConditions.status = { in: status };
      whereConditions.dreamerId = userId; //NOTE. Dreamer 전용 api 조건
    }

    if (isAssigned === true) whereConditions.assignees = { some: { id: userId } }; //NOTE. 지정견적 조회 API

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
