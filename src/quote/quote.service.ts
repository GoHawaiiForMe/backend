import { Injectable } from '@nestjs/common';
import QuoteRepository from './quote.repository';
import { Quote } from '@prisma/client';
import QuoteToClientProperties from './type/quoteToClientProperties.interface';
import NotFoundError from 'src/common/errors/notFoundError';
import ErrorMessage from 'src/common/enums/error.message';
import ForbiddenError from 'src/common/errors/forbiddenError';
import { QuoteQueryOptions } from './type/quoteQueryOptions.interface';

@Injectable()
export default class QuoteService {
  constructor(private readonly quoteRepository: QuoteRepository) {}

  async getQuotesByPlanId(
    options: QuoteQueryOptions,
    userId: string
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    //TODO. Dreamer 본인인지 권한 체크 필요 -> 데코레이터 예정
    const [totalCount, list] = await Promise.all([
      this.quoteRepository.totalCount(options),
      this.quoteRepository.findMany(options)
    ]);
    const toClientList = list.map((quote) => quote.toClient());

    return { totalCount, list: toClientList };
  }

  async getQuoteById(id: string, userId: string): Promise<QuoteToClientProperties> {
    const quote = await this.quoteRepository.getQuoteById(id);
    if (!quote) {
      throw new NotFoundError(ErrorMessage.QUOTE_NOT_FOUND);
    }
    if (userId !== quote.getDreamerId() && userId !== quote.getMakerId()) {
      throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_ID);
    }
    return quote.toClient();
  }
}
