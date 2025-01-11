import { Injectable } from '@nestjs/common';
import QuoteRepository from './quote.repository';
import { Quote } from '@prisma/client';
import { QuoteToClientProperties } from './type/quoteProperties';
import NotFoundError from 'src/common/errors/notFoundError';
import ErrorMessage from 'src/common/enums/error.message';
import ForbiddenError from 'src/common/errors/forbiddenError';
import { QuoteQueryOptions } from './type/quote.type';
import { StatusEnum } from 'src/common/types/status.type';
import { QuoteWhereInput } from './type/quote.type';

@Injectable()
export default class QuoteService {
  constructor(private readonly quoteRepository: QuoteRepository) {}

  async getQuotesByPlanId(
    options: QuoteQueryOptions,
    userId: string
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    //TODO. Dreamer 본인인지 권한 체크 필요 -> 데코레이터 예정
    const { planId, status, page, pageSize } = options;
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
    const { page, pageSize, isSent, userId } = options;

    const whereConditions = this.buildWhereConditions(options);

    const [list, totalCount] = await Promise.all([
      this.quoteRepository.findMany({ page, pageSize, whereConditions }),
      this.quoteRepository.totalCount(whereConditions)
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

  private buildWhereConditions(options: QuoteQueryOptions): QuoteWhereInput {
    const { planId, status, isSent, userId } = options || {};
    let whereConditions: QuoteWhereInput = {
      isDeletedAt: null
    };

    if (userId) {
      whereConditions.makerId = userId;
    }

    if (planId) {
      whereConditions.planId = planId; // planId 조건 추가
    }

    if (status?.length) {
      whereConditions.plan = { status: { in: status } }; // status 배열이 있으면 추가
    }

    if (isSent !== undefined) {
      // isSent가 true이면 내가 보낸 견적에 대한 조건을 추가
      if (isSent) {
        whereConditions = {
          ...whereConditions,
          OR: [
            { isConfirmed: true }, // 내가 뽑힌 견적
            { isConfirmed: false, plan: { status: StatusEnum.PENDING } } // 반려되지 않은 견적 중 plan이 PENDING인 경우
          ]
        };
      } else {
        // isSent가 false이면 반려된 견적만 가져옴
        whereConditions = {
          ...whereConditions,
          isConfirmed: false, // isConfirmed가 false여야 함
          plan: { status: { in: [StatusEnum.CONFIRMED, StatusEnum.COMPLETED, StatusEnum.OVERDUE] } } // 반려된 견적의 상태
        };
      }
    }
    return whereConditions;
  }
}
