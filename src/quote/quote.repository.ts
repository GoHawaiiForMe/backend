import { Injectable } from '@nestjs/common';
import DBClient from 'prisma/DB.client';
import IQuote from './domain/quote.interface';
import QuoteMapper from './domain/quote.mapper';

@Injectable()
export default class QuoteRepository {
  constructor(private readonly db: DBClient) {}
  async getQuoteById(id: string): Promise<IQuote> {
    const quote = await this.db.quote.findUnique({
      where: { id, isDeletedAt: null },
      include: {
        plan: true,
        maker: true
      }
    });

    const domainQuote = new QuoteMapper(quote);
    return domainQuote.toDomain();
  }
}
