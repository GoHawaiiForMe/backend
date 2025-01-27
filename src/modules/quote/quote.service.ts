import { Injectable } from '@nestjs/common';
import QuoteRepository from './quote.repository';
import { QuoteProperties, QuoteToClientProperties } from '../../common/types/quote/quoteProperties';
import NotFoundError from 'src/common/errors/notFoundError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import ForbiddenError from 'src/common/errors/forbiddenError';
import { QuoteQueryOptions } from '../../common/types/quote/quote.type';
import { StatusEnum } from 'src/common/constants/status.type';
import ConflictError from 'src/common/errors/conflictError';
import IQuote from '../../common/domains/quote/quote.interface';
import BadRequestError from 'src/common/errors/badRequestError';
import { Role, RoleEnum } from 'src/common/constants/role.type';
import Quote from 'src/common/domains/quote/quote.domain';
import UserService from '../user/user.service';
import FollowService from '../follow/follow.service';

@Injectable()
export default class QuoteService {
  constructor(
    private readonly quoteRepository: QuoteRepository,
    private readonly userService: UserService
  ) {}

  async getQuotesByPlanId(
    options: QuoteQueryOptions
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const [totalCount, list] = await Promise.all([
      this.quoteRepository.totalCount(options),
      this.quoteRepository.findMany(options)
    ]);

    const toClientList = await Promise.all(list.map(async (quote) => await this.mapToMakerProfile(quote, false)));

    return { totalCount, list: toClientList };
  }

  async getQuotesByMaker(options: QuoteQueryOptions): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const [list, totalCount] = await Promise.all([
      this.quoteRepository.findMany(options),
      this.quoteRepository.totalCount(options)
    ]);

    const toClientList = list.map((quote) => quote.toMaker());

    return { totalCount, list: toClientList };
  }

  async getQuoteById(id: string, userId: string, role: Role): Promise<QuoteToClientProperties> {
    const quote = await this.quoteRepository.findById(id);

    if (!quote) throw new NotFoundError(ErrorMessage.QUOTE_NOT_FOUND);

    if (userId !== quote.getDreamerId() && userId !== quote.getMakerId()) {
      throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_ID);
    }

    if (role === RoleEnum.MAKER) return quote.toMaker();
    else return this.mapToMakerProfile(quote, true);
  }

  async createQuote(data: QuoteProperties): Promise<QuoteToClientProperties> {
    const planId = data.planId;
    const makerId = data.makerId;
    const isQuote = await this.quoteRepository.exists({ planId, userId: makerId });

    if (isQuote) throw new ConflictError(ErrorMessage.QUOTE_CONFLICT);

    const quoteData = Quote.create(data);
    const quote = await this.quoteRepository.create(quoteData);
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

  async deleteQuote(id: string, userId: string): Promise<void> {
    const quote = await this.quoteRepository.findById(id);

    if (!quote) throw new NotFoundError(ErrorMessage.QUOTE_NOT_FOUND);
    if (userId !== quote.getMakerId()) throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_MAKER);

    if (quote.getPlanStatus() !== StatusEnum.PENDING) {
      throw new BadRequestError(ErrorMessage.QUOTE_DELETE_BAD_REQUEST_STATUS);
    }

    await this.quoteRepository.delete(id);
  }

  private async mapToMakerProfile(quote: IQuote, isPlan: boolean): Promise<QuoteToClientProperties> {
    const userId = quote.getDreamerId();
    const makerId = quote.getMakerId();

    const mappedQuote = isPlan ? quote.toClient() : quote.toClientWithoutPlan();
    const maker = await this.userService.getProfileCardData(makerId, userId);
    mappedQuote.maker = maker;

    return mappedQuote;
  }
}
