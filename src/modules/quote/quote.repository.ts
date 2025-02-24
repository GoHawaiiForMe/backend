import { Injectable } from '@nestjs/common';
import DBClient from 'src/providers/database/prisma/DB.client';
import SortOrder from 'src/common/constants/sortOrder.enum';
import { QuoteIncludeConditions, QuoteQueryOptions, QuoteWhereConditions } from './types/quote.type';
import IQuote from './domain/quote.interface';
import QuoteMapper from './domain/quote.mapper';
import { StatusValues } from 'src/common/constants/status.type';
import TransactionManager from 'src/providers/database/transaction/transaction.manager';

@Injectable()
export default class QuoteRepository {
  constructor(private readonly db: DBClient) {}

  private getPrismaClient() {
    return TransactionManager.getPrismaClient() || this.db;
  }

  async findMany(options: QuoteQueryOptions): Promise<IQuote[]> {
    const { page, pageSize, isSent } = options;
    const whereConditions = this.buildWhereConditions(options);
    const includeConditions = this.buildIncludeConditions(options);
    const orderBy =
      isSent === true
        ? [{ plan: { status: SortOrder.ASC } }, { createdAt: SortOrder.DESC }]
        : { createdAt: SortOrder.DESC };
    const quotes = await this.getPrismaClient().quote.findMany({
      where: whereConditions,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy,
      include: includeConditions
    });

    const domainQuotes = quotes.map((quote) => new QuoteMapper(quote).toDomain());
    return domainQuotes;
  }

  async totalCount(options: QuoteQueryOptions): Promise<number> {
    const whereConditions = this.buildWhereConditions(options);
    const totalCount = await this.getPrismaClient().quote.count({
      where: whereConditions
    });
    return totalCount;
  }

  async findById(id: string): Promise<IQuote> {
    const includeConditions = this.buildIncludeConditions();

    const quote = await this.getPrismaClient().quote.findUnique({
      where: { id, isDeletedAt: null },
      include: includeConditions
    });

    const domainQuote = new QuoteMapper(quote).toDomain();
    return domainQuote;
  }

  async exists(options: { planId: string; userId: string }): Promise<Boolean> {
    const whereConditions = this.buildWhereConditions(options);
    const quote = await this.getPrismaClient().quote.findFirst({
      where: whereConditions
    });
    return quote !== null;
  }

  async create(data: IQuote): Promise<IQuote> {
    const { planId, makerId, isAssigned, price, content } = data.toDB();
    const quote = await this.getPrismaClient().quote.create({
      data: {
        plan: { connect: { id: planId } },
        maker: { connect: { id: makerId } },
        isAssigned,
        price,
        content
      },
      include: {
        maker: { select: { id: true, nickName: true } }
      } //NOTE. 알람을 위해 추가
    });

    const domainQuote = new QuoteMapper(quote);

    return domainQuote.toDomain();
  }

  async update(data: IQuote): Promise<IQuote> {
    const { id, isConfirmed } = data.toDBForUpdate();

    const quote = await this.getPrismaClient().quote.update({
      where: { id },
      data: {
        isConfirmed,
        plan: isConfirmed
          ? {
              update: {
                status: StatusValues.CONFIRMED
              }
            }
          : {}
      },
      include: {
        maker: { select: { id: true, nickName: true } },
        plan: { select: { id: true, title: true, tripDate: true, dreamer: { select: { id: true } } } }
      }
    });

    const domainQuote = new QuoteMapper(quote).toDomain();

    return domainQuote;
  }

  async delete(id: string): Promise<IQuote> {
    const quote = await this.getPrismaClient().quote.update({
      where: { id },
      data: { isDeletedAt: new Date() }
    });

    const domainQuote = new QuoteMapper(quote);

    return domainQuote.toDomain();
  }

  async deleteMany(planId: string): Promise<{ count: number }> {
    const deleteCount = await this.getPrismaClient().quote.updateMany({
      where: { planId, isDeletedAt: null },
      data: { isDeletedAt: new Date() }
    });
    return deleteCount;
  }

  private buildWhereConditions(options: Partial<QuoteQueryOptions>): QuoteWhereConditions {
    const { planId, isConfirmed, isSent, userId } = options || {};
    let whereConditions: QuoteWhereConditions = {
      isDeletedAt: null
    };

    if (userId) whereConditions.makerId = userId;
    if (planId) whereConditions.planId = planId;
    if (isConfirmed === true) whereConditions.isConfirmed = true;

    if (isSent === true) {
      whereConditions = {
        ...whereConditions,
        OR: [
          { isConfirmed: true }, // 내가 뽑힌 견적
          { isConfirmed: false, plan: { status: StatusValues.PENDING } } // 반려되지 않은 견적 중 plan이 PENDING인 경우
        ]
      };
    } else if (isSent === false) {
      // isSent가 false이면 반려된 견적만 가져옴
      whereConditions = {
        ...whereConditions,
        isConfirmed: false, // isConfirmed가 false여야 함
        plan: { status: { in: [StatusValues.CONFIRMED, StatusValues.COMPLETED, StatusValues.OVERDUE] } } // 반려된 견적의 상태
      };
    }
    return whereConditions;
  }

  private buildIncludeConditions(options?: Partial<QuoteQueryOptions>): QuoteIncludeConditions {
    const { planId } = options || {};
    const includeConditions: QuoteIncludeConditions = {
      maker: {
        select: {
          id: true,
          nickName: true
        }
      }
    };

    if (!planId) {
      includeConditions.plan = {
        select: {
          id: true,
          createdAt: true,
          title: true,
          tripDate: true,
          tripType: true,
          serviceArea: true,
          details: true,
          status: true,
          dreamer: { select: { id: true, nickName: true } },
          address: true
        }
      };
    }

    return includeConditions;
  }
}
