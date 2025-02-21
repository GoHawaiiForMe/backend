import { Injectable } from '@nestjs/common';
import GroupByField from 'src/common/constants/groupByField.enum';
import PlanOrder from 'src/common/constants/planOrder.enum';
import { RoleValues } from 'src/common/constants/role.type';
import SortOrder from 'src/common/constants/sortOrder.enum';
import { Status, StatusValues } from 'src/common/constants/status.type';
import IPlan from './domain/plan.interface';
import PlanMapper from './domain/plan.mapper';
import { GroupByCount, PlanWhereConditions } from 'src/modules/plan/types/plan.type';
import { PlanOrderByField } from 'src/modules/plan/types/plan.type';
import { PlanQueryOptions } from 'src/modules/plan/types/plan.type';
import DBClient from 'src/providers/database/prisma/DB.client';
import TransactionManager from 'src/providers/database/transaction/transaction.manager';

@Injectable()
export default class PlanRepository {
  constructor(private readonly db: DBClient) {}

  private getPrismaClient() {
    return TransactionManager.getPrismaClient() || this.db;
  }

  async findMany(options: PlanQueryOptions): Promise<IPlan[]> {
    const { orderBy, page, pageSize, reviewed, readyToComplete } = options || {};
    const withQuote = reviewed !== null || readyToComplete === true;

    const whereConditions = this.buildWhereConditions(options);
    const orderByField: PlanOrderByField =
      orderBy === PlanOrder.RECENT ? { createdAt: SortOrder.DESC } : { tripDate: SortOrder.ASC };

    const plans = await this.getPrismaClient().plan.findMany({
      where: whereConditions,
      orderBy: orderByField,
      take: pageSize,
      skip: pageSize * (page - 1),
      include: {
        dreamer: { select: { id: true, nickName: true } },
        assignees: { select: { id: true, nickName: true } },
        quotes: withQuote
          ? {
              where: { isConfirmed: true },
              select: {
                id: true,
                price: true,
                isConfirmed: true,
                maker: { select: { id: true, nickName: true, makerProfile: { select: { image: true } } } }
              }
            }
          : false
      }
    });

    const domainPlans = plans.map((plan) => new PlanMapper(plan).toDomain());
    return domainPlans;
  }

  async totalCount(options: PlanQueryOptions): Promise<number> {
    const whereConditions = this.buildWhereConditions(options);
    const totalCount = await this.getPrismaClient().plan.count({
      where: whereConditions
    });

    return totalCount;
  }

  async groupByCount(options: PlanQueryOptions): Promise<GroupByCount> {
    const groupByField =
      options.groupByField === GroupByField.TRIP_TYPE ? GroupByField.TRIP_TYPE : GroupByField.SERVICE_AREA;
    const whereConditions = this.buildWhereConditions(options);

    const groupByCount = await this.getPrismaClient().plan.groupBy({
      by: [groupByField],
      where: whereConditions,
      _count: { id: true }
    });

    const formattedGroupByCount = groupByCount.map((group) => ({
      [groupByField]: group[groupByField],
      count: group._count.id
    }));

    return formattedGroupByCount;
  }

  async findById(id: string): Promise<IPlan> {
    const plan = await this.getPrismaClient().plan.findUnique({
      where: { id, isDeletedAt: null },
      include: {
        dreamer: { select: { id: true, nickName: true } },
        assignees: { select: { id: true, nickName: true } },
        quotes: { select: { id: true, makerId: true, price: true, isConfirmed: true } }
      }
    });

    const domainPlan = new PlanMapper(plan).toDomain();
    return domainPlan;
  }

  async create(data: IPlan): Promise<IPlan> {
    const { title, tripDate, tripType, serviceArea, details, address, dreamerId } = data.toDB();
    const plan = await this.getPrismaClient().plan.create({
      data: {
        title,
        tripDate,
        tripType,
        serviceArea,
        details,
        address,
        status: StatusValues.PENDING,
        dreamer: { connect: { id: dreamerId } }
      },
      include: {
        dreamer: { select: { id: true, nickName: true } },
        assignees: { select: { id: true, nickName: true } }
      }
    });

    const domainPlan = new PlanMapper(plan).toDomain();
    return domainPlan;
  }

  async update(data: IPlan): Promise<IPlan> {
    const { id, status, assigneeId, isAssigned } = data.toDB();
    const plan = await this.getPrismaClient().plan.update({
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
        dreamer: { select: { id: true, nickName: true } },
        assignees: { select: { id: true, nickName: true } }
      }
    });

    const domainPlan = new PlanMapper(plan).toDomain();
    return domainPlan;
  }

  async updateMany(data: { ids: string[]; status: Status }): Promise<number> {
    const { ids, status } = data;
    const results = await this.getPrismaClient().plan.updateMany({
      where: { id: { in: ids } },
      data: { status }
    });

    return results.count; // 업데이트된 문서의 수 반환
  }

  async delete(id: string): Promise<IPlan> {
    const plan = await this.getPrismaClient().plan.update({
      where: { id, isDeletedAt: null },
      data: {
        isDeletedAt: new Date(),
        quotes: {
          updateMany: {
            where: { isDeletedAt: null },
            data: { isDeletedAt: new Date() }
          }
        }
      },
      include: {
        dreamer: { select: { id: true, nickName: true } },
        assignees: { select: { id: true, nickName: true } },
        quotes: { select: { id: true, makerId: true } }
      }
    });

    const domainPlan = new PlanMapper(plan).toDomain();
    return domainPlan;
  }

  private buildWhereConditions(whereOptions: PlanQueryOptions): PlanWhereConditions {
    const { keyword, tripDate, tripType, serviceArea, isAssigned, userId, status, role, reviewed } = whereOptions;

    const whereConditions: PlanWhereConditions = {
      isDeletedAt: null
    };

    if (tripDate) {
      whereConditions.tripDate = { lte: tripDate };
      whereConditions.status = { in: status };
    } //NOTE.스케줄러 조건 + readyToCompete 조건

    if (serviceArea) whereConditions.serviceArea = { in: serviceArea };

    if (tripType) whereConditions.tripType = { in: tripType };

    if (role === RoleValues.MAKER) {
      whereConditions.status = { in: status }; //NOTE. Maker 전용 api 조건
      whereConditions.quotes = { none: { makerId: userId } };
      if (isAssigned === true) whereConditions.assignees = { some: { id: userId } }; //NOTE. 지정견적 조회 API
    } else if (userId) {
      whereConditions.dreamerId = userId; //NOTE. Dreamer 전용 api 조건
      if (status) whereConditions.status = { in: status };
      if (reviewed === true) whereConditions.review = { isNot: null };
      else if (reviewed === false) whereConditions.review = { is: null };
    }

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
