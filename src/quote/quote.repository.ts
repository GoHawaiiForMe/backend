import { Injectable } from '@nestjs/common';
import DBClient from 'prisma/DB.client';
import IQuote from './domain/quote.interface';
import QuoteMapper from './domain/quote.mapper';
import SortOrder from 'src/common/enums/sortOrder';
import { QuoteQueryOptions, QuoteWhereInput } from './type/quote.type';

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
    const { id, price, content, isConfirmed, isAssigned } = data.toDB();

    const updateData = { price, content, isConfirmed, isAssigned };
    const quote = await this.db.quote.update({
      where: { id },
      data: updateData
    });

    const domainQuote = new QuoteMapper(quote).toDomain();
    return domainQuote;
  }
}
