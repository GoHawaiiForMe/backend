import { Injectable } from '@nestjs/common';
import QuoteRepository from './quote.repository';
import { QuoteToClientProperties } from '../../common/types/quote/quoteProperties';
import NotFoundError from 'src/common/errors/notFoundError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import ForbiddenError from 'src/common/errors/forbiddenError';
import { CreateQuoteData, QuoteQueryOptions } from '../../common/types/quote/quote.type';
import { Status } from 'src/common/constants/status.type';
import { QuoteWhereConditions } from '../../common/types/quote/quote.type';
import QuoteMapper from '../../common/domains/quote/quote.mapper';
import ConflictError from 'src/common/errors/conflictError';
import IQuote from '../../common/domains/quote/quote.interface';
import BadRequestError from 'src/common/errors/badRequestError';

@Injectable()
export default class QuoteService {
  constructor(private readonly quoteRepository: QuoteRepository) {}

  async getQuotesByPlanId(
    options: QuoteQueryOptions,
    userId: string
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const [totalCount, list] = await Promise.all([
      this.quoteRepository.totalCount(options),
      this.quoteRepository.findMany(options)
    ]);
    const toClientList = list.map((quote) => quote.toClient());

    return { totalCount, list: toClientList };
  }

  async getQuotesByMaker(options: QuoteQueryOptions): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const { page, pageSize } = options;

    const [list, totalCount] = await Promise.all([
      this.quoteRepository.findMany(options),
      this.quoteRepository.totalCount(options)
    ]);

    const toClientList = list.map((quote) => quote.toClient());

    return { totalCount, list: toClientList };
  }

  async getQuoteById(id: string, userId: string): Promise<QuoteToClientProperties> {
    const quote = await this.quoteRepository.findById(id);

    if (!quote) throw new NotFoundError(ErrorMessage.QUOTE_NOT_FOUND);

    if (userId !== quote.getDreamerId() && userId !== quote.getMakerId()) {
      throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_ID);
    }

    return quote.toClient();
  }

  async createQuote(data: IQuote): Promise<QuoteToClientProperties> {
    const planId = data.getPlanId();
    const makerId = data.getMakerId();
    const isQuote = await this.quoteRepository.exists({ planId, userId: makerId });

    if (isQuote) throw new ConflictError(ErrorMessage.QUOTE_CONFLICT);

    const quote = await this.quoteRepository.create(data);
    return quote.toClient();
  }

  async update(id: string, userId: string, data: { isConfirmed: boolean }): Promise<QuoteToClientProperties> {
    const quote = await this.quoteRepository.findById(id);

    if (!quote) throw new NotFoundError(ErrorMessage.QUOTE_NOT_FOUND);
    if (userId !== quote.getDreamerId()) {
      throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_DREAMER);
    }

    const returnQuote = await this.quoteRepository.update(quote.update(data));
    return returnQuote.toClient();
  }

  async deleteQuote(id: string, userId: string): Promise<IQuote> {
    const quote = await this.quoteRepository.findById(id);

    if (!quote) throw new NotFoundError(ErrorMessage.QUOTE_NOT_FOUND);
    if (userId !== quote.getMakerId()) throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_MAKER);

    if (quote.getPlanStatus() !== Status.PENDING) {
      throw new BadRequestError(ErrorMessage.QUOTE_DELETE_BAD_REQUEST_STATUS);
    }

    const deletedQuote = await this.quoteRepository.delete(id);
    return deletedQuote;
  }
}
