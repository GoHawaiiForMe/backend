import { Injectable } from '@nestjs/common';
import DBClient from 'prisma/DB.client';
import IQuote from './domain/quote.interface';
import QuoteMapper from './domain/quote.mapper';
import SortOrder from 'src/common/enums/sortOrder';
import { QuoteQueryOptions } from './type/quote.type';
import { StatusEnum } from 'src/common/types/status.type';

@Injectable()
export default class QuoteRepository {
  constructor(private readonly db: DBClient) {}

  async findMany(options: QuoteQueryOptions): Promise<IQuote[]> {
    const { page, pageSize, whereConditions } = options;

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

  async totalCount(whereConditions: any): Promise<number> {
    const totalCount = await this.db.quote.count({
      where: whereConditions
    });
    return totalCount;
  }

  async getQuoteById(id: string): Promise<IQuote> {
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
}
