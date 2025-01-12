import { Injectable } from '@nestjs/common';
import DBClient from 'prisma/DB.client';
import IQuote from './domain/quote.interface';
import QuoteMapper from './domain/quote.mapper';
import SortOrder from 'src/common/enums/sortOrder';
import { QuoteQueryOptions } from './type/quoteQueryOptions.interface';

@Injectable()
export default class QuoteRepository {
  constructor(private readonly db: DBClient) {}

  async findMany(options: QuoteQueryOptions): Promise<IQuote[]> {
    const { planId, page, pageSize } = options;

    const quotes = await this.db.quote.findMany({
      where: {
        planId,
        isDeletedAt: null
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: { createdAt: SortOrder.DESC },
      include: { maker: true }
    });

    const domainQuotes = quotes.map((quote) => new QuoteMapper(quote).toDomain());
    return domainQuotes;
  }

  async totalCount(options: any): Promise<number> {
    const { planId } = options;
    const totalCount = await this.db.quote.count({
      where: {
        planId,
        isDeletedAt: null
      }
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
