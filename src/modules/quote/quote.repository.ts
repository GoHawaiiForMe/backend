import { Injectable } from '@nestjs/common';
import DBClient from 'src/providers/database/prisma/DB.client';
import SortOrder from 'src/common/constants/sortOrder.enum';
import { QuoteQueryOptions, QuoteWhereConditions } from '../../common/types/quote/quote.type';
import IQuote from 'src/common/domains/quote/quote.interface';
import QuoteMapper from 'src/common/domains/quote/quote.mapper';
import { Status } from 'src/common/constants/status.type';

@Injectable()
export default class QuoteRepository {
  constructor(private readonly db: DBClient) {}

  async findMany(options: QuoteQueryOptions): Promise<IQuote[]> {
    const { page, pageSize } = options;
    const whereConditions = this.buildWhereConditions(options);
    const quotes = await this.db.quote.findMany({
      where: whereConditions,
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: SortOrder.DESC },
      include: { maker: true }
    });

    const domainQuotes = quotes.map((quote) => new QuoteMapper(quote).toDomain());
    return domainQuotes;
  }

  async totalCount(options: QuoteQueryOptions): Promise<number> {
    const whereConditions = this.buildWhereConditions(options);
    const totalCount = await this.db.quote.count({
      where: whereConditions
    });
    return totalCount;
  }

  async findById(id: string): Promise<IQuote> {
    const quote = await this.db.quote.findUnique({
      where: { id, isDeletedAt: null },
      include: {
        plan: true,
        maker: true
      }
    });

    const domainQuote = new QuoteMapper(quote).toDomain();
    return domainQuote;
  }

  async exists(options: { planId: string; userId: string }): Promise<Boolean> {
    const whereConditions = this.buildWhereConditions(options);
    const quote = await this.db.quote.findFirst({
      where: whereConditions
    });
    return quote !== null;
  }

  async create(data: IQuote): Promise<IQuote> {
    const { planId, makerId, isAssigned, price, content } = data.toDB();
    const quote = await this.db.quote.create({
      data: {
        plan: { connect: { id: planId } },
        maker: { connect: { id: makerId } },
        isAssigned,
        price,
        content
      },
      include: { maker: true }
    });

    const domainQuote = new QuoteMapper(quote);

    return domainQuote.toDomain();
  }

  async update(data: IQuote): Promise<IQuote> {
    const { id, isConfirmed } = data.toDBForUpdate();

    const quote = await this.db.quote.update({
      where: { id },
      data: { isConfirmed }
    });

    const domainQuote = new QuoteMapper(quote).toDomain();

    return domainQuote;
  }

  async delete(id: string): Promise<IQuote> {
    const quote = await this.db.quote.update({
      where: { id },
      data: { isDeletedAt: new Date() }
    });

    const domainQuote = new QuoteMapper(quote);

    return domainQuote.toDomain();
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
          { isConfirmed: false, plan: { status: Status.PENDING } } // 반려되지 않은 견적 중 plan이 PENDING인 경우
        ]
      };
    } else if (isSent === false) {
      // isSent가 false이면 반려된 견적만 가져옴
      whereConditions = {
        ...whereConditions,
        isConfirmed: false, // isConfirmed가 false여야 함
        plan: { status: { in: [Status.CONFIRMED, Status.COMPLETED, Status.OVERDUE] } } // 반려된 견적의 상태
      };
    }
    return whereConditions;
  }
}
