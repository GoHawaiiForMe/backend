import { Injectable } from '@nestjs/common';
import QuoteRepository from './quote.repository';
import { QuoteToClientProperties } from '../../common/types/quote/quoteProperties';
import NotFoundError from 'src/common/errors/notFoundError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import ForbiddenError from 'src/common/errors/forbiddenError';
import { CreateQuoteData, QuoteQueryOptions } from '../../common/types/quote/quote.type';
import { StatusEnum } from 'src/common/constants/status.type';
import { QuoteWhereConditions } from '../../common/types/quote/quote.type';
import QuoteMapper from '../../common/domains/quote/quote.mapper';
import ConflictError from 'src/common/errors/conflictError';
import IQuote from '../../common/domains/quote/quote.interface';

@Injectable()
export default class QuoteService {
  constructor(private readonly quoteRepository: QuoteRepository) {}

  async getQuotesByPlanId(
    options: QuoteQueryOptions,
    userId: string
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const whereConditions = this.buildWhereConditions(options);
    options.whereConditions = whereConditions;

    const [totalCount, list] = await Promise.all([
      this.quoteRepository.totalCount(whereConditions),
      this.quoteRepository.findMany(options)
    ]);
    const toClientList = list.map((quote) => quote.toClient());

    return { totalCount, list: toClientList };
  }

  async getQuotesByMaker(options: QuoteQueryOptions): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const { page, pageSize } = options;

    const whereConditions = this.buildWhereConditions(options);

    const [list, totalCount] = await Promise.all([
      this.quoteRepository.findMany({ page, pageSize, whereConditions }),
      this.quoteRepository.totalCount(whereConditions)
    ]);

    const toClientList = list.map((quote) => quote.toClient());

    return { totalCount, list: toClientList };
  }

  async getQuoteById(id: string, userId: string): Promise<QuoteToClientProperties> {
    const quote = await this.quoteRepository.findById(id);
    if (!quote) {
      throw new NotFoundError(ErrorMessage.QUOTE_NOT_FOUND);
    }
    if (userId !== quote.getDreamerId() && userId !== quote.getMakerId()) {
      throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_ID);
    }
    return quote.toClient();
  }

  async createQuote(data: IQuote): Promise<QuoteToClientProperties> {
    const planId = data.getPlanId();
    const makerId = data.getMakerId();
    const whereConditions = this.buildWhereConditions({ planId, userId: makerId });
    const isQuote = await this.quoteRepository.exists(whereConditions);

    if (isQuote) {
      throw new ConflictError(ErrorMessage.QUOTE_CONFLICT);
    }

    const quote = await this.quoteRepository.create(data);
    return quote.toClient();
  }

  async update(id: string, userId: string, data: { isConfirmed: boolean }): Promise<QuoteToClientProperties> {
    const quote = await this.quoteRepository.findById(id);

    if (!quote) {
      throw new NotFoundError(ErrorMessage.QUOTE_NOT_FOUND);
    }
    if (userId !== quote.getDreamerId()) {
      throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_DREAMER);
    }

    const returnQuote = await this.quoteRepository.update(quote.update(data));
    return returnQuote.toClient();
  }

  async deleteQuote(id: string, userId: string): Promise<IQuote> {
    const quote = await this.quoteRepository.findById(id);

    if (!quote) {
      throw new NotFoundError(ErrorMessage.QUOTE_NOT_FOUND);
    }
    if (userId !== quote.getMakerId()) {
      throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_MAKER);
    }

    const deletedQuote = await this.quoteRepository.delete(id);
    return deletedQuote;
  }

  private buildWhereConditions(options: Partial<QuoteQueryOptions>): QuoteWhereConditions {
    const { planId, isConfirmed, isSent, userId } = options || {};
    let whereConditions: QuoteWhereConditions = {
      isDeletedAt: null
    };

    if (userId) {
      whereConditions.makerId = userId;
    }

    if (planId) {
      whereConditions.planId = planId;
    }

    if (isConfirmed === true) {
      whereConditions.isConfirmed = true;
    }

    if (isSent === true) {
      whereConditions = {
        ...whereConditions,
        OR: [
          { isConfirmed: true }, // 내가 뽑힌 견적
          { isConfirmed: false, plan: { status: StatusEnum.PENDING } } // 반려되지 않은 견적 중 plan이 PENDING인 경우
        ]
      };
    } else if (isSent === false) {
      // isSent가 false이면 반려된 견적만 가져옴
      whereConditions = {
        ...whereConditions,
        isConfirmed: false, // isConfirmed가 false여야 함
        plan: { status: { in: [StatusEnum.CONFIRMED, StatusEnum.COMPLETED, StatusEnum.OVERDUE] } } // 반려된 견적의 상태
      };
    }
    return whereConditions;
  }
}
