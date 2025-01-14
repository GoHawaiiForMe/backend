import { Injectable } from '@nestjs/common';
import DBClient from 'src/providers/database/prisma/DB.client';
import SortOrder from 'src/common/constants/sortOrder.enum';
import { QuoteQueryOptions, QuoteWhereInput } from '../../common/types/quote/quote.type';
import IQuote from 'src/common/domains/quote/quote.interface';
import QuoteMapper from 'src/common/domains/quote/quote.mapper';

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

  async totalCount(whereConditions: QuoteWhereInput): Promise<number> {
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

  async exists(whereConditions: QuoteWhereInput): Promise<Boolean> {
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
}
