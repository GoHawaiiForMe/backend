import { Injectable } from '@nestjs/common';
import QuoteRepository from './quote.repository';
import { Quote } from '@prisma/client';
import QuoteToClientProperties from './type/quoteToClientProperties.interface';
import NotFoundError from 'src/common/errors/notFoundError';
import ErrorMessage from 'src/common/enums/error.message';
import ForbiddenError from 'src/common/errors/forbiddenError';

@Injectable()
export default class QuoteService {
  constructor(private readonly quoteRepository: QuoteRepository) {}

  async getQuoteById(id: string, userId: string): Promise<QuoteToClientProperties> {
    const quote = await this.quoteRepository.getQuoteById(id);
    if (userId !== quote.getDreamerId() && userId !== quote.getMakerId()) {
      throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_ID);
    }
    return quote.toClient();
  }
}
