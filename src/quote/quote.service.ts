import { Injectable } from '@nestjs/common';
import QuoteRepository from './quote.repository';
import { QuoteToClientProperties } from './type/quoteProperties';
import NotFoundError from 'src/common/errors/notFoundError';
import ErrorMessage from 'src/common/enums/error.message';
import ForbiddenError from 'src/common/errors/forbiddenError';
import { CreateQuoteData, QuoteQueryOptions } from './type/quote.type';
import { StatusEnum } from 'src/common/types/status.type';
import { QuoteWhereInput } from './type/quote.type';
import QuoteMapper from './domain/quote.mapper';
import ConflictError from 'src/common/errors/conflictError';
import PlanRepository from 'src/plan/plan.repository';

@Injectable()
export default class QuoteService {
  constructor(
    private readonly quoteRepository: QuoteRepository,
    private readonly planRepository: PlanRepository
  ) {}

  async getQuotesByPlanId(
    options: QuoteQueryOptions,
    userId: string
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    //TODO. Dreamer 본인인지 권한 체크 필요 -> 데코레이터 예정

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

  async createQuote(data: CreateQuoteData, userId: string): Promise<QuoteToClientProperties> {
    const { planId } = data;
    //TODO. 메이커인지 권한체크 필요 -> 데코레이터 예정
    //TODO. 플랜의 존재 확인 Quote -> 데코레이터 예정

    const whereConditions = this.buildWhereConditions({ planId, userId });
    const isQuote = await this.quoteRepository.isExists(whereConditions);
    if (!isQuote) {
      throw new ConflictError(ErrorMessage.QUOTE_CONFLICT);
    } //NOTE. 해당 플랜에 견적이 있는지 확인
    //TODO. 해당 견적의 지정견적요청을 확인 후 반영 -> 플랜 도메인 만든 이후 예정

    const mapperData = { ...data, makerId: userId, isConfirmed: false, isAssigned: false };
    const domainData = new QuoteMapper(mapperData).toDomain();
    const quote = await this.quoteRepository.create(domainData);

    return quote.toClient();
  }

  private buildWhereConditions(options: Partial<QuoteQueryOptions>): QuoteWhereInput {
    const { planId, isConfirmed, isSent, userId } = options || {};
    let whereConditions: QuoteWhereInput = {
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
