import { Injectable } from '@nestjs/common';
import QuoteRepository from './quote.repository';
import { QuoteProperties, QuoteToClientProperties } from './types/quoteProperties';
import NotFoundError from 'src/common/errors/notFoundError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import ForbiddenError from 'src/common/errors/forbiddenError';
import { QuoteQueryOptions } from './types/quote.type';
import { StatusValues } from 'src/common/constants/status.type';
import ConflictError from 'src/common/errors/conflictError';
import IQuote from './domain/quote.interface';
import BadRequestError from 'src/common/errors/badRequestError';
import { Role, RoleValues } from 'src/common/constants/role.type';
import Quote from './domain/quote.domain';
import UserService from '../user/user.service';
import ChatRoomService from '../chatRoom/chatRoom.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PointEventEnum } from 'src/common/constants/pointEvent.type';
import Transactional from 'src/common/decorators/transaction.decorator';
import TransactionManager from 'src/providers/database/transaction/transaction.manager';

@Injectable()
export default class QuoteService {
  constructor(
    @InjectQueue('points') private readonly pointQueue: Queue,
    private readonly repository: QuoteRepository,
    private readonly userService: UserService,
    private readonly chatRoomService: ChatRoomService,
    private readonly transactionManager: TransactionManager
  ) {}

  async getQuotesByPlanId(
    options: QuoteQueryOptions
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const [totalCount, list] = await Promise.all([
      this.repository.totalCount(options),
      this.repository.findMany(options)
    ]);

    const toClientList = await Promise.all(list.map(async (quote) => await this.mapToMakerProfile(quote, false)));

    return { totalCount, list: toClientList };
  }

  async getQuotesByMaker(options: QuoteQueryOptions): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const [list, totalCount] = await Promise.all([
      this.repository.findMany(options),
      this.repository.totalCount(options)
    ]);

    const toClientList = list.map((quote) => quote.toMaker());

    return { totalCount, list: toClientList };
  }

  async getQuoteById(id: string, userId: string, role: Role): Promise<QuoteToClientProperties> {
    const quote = await this.repository.findById(id);

    if (!quote) throw new NotFoundError(ErrorMessage.QUOTE_NOT_FOUND);

    if (userId !== quote.getDreamerId() && userId !== quote.getMakerId()) {
      throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_ID);
    }

    if (role === RoleValues.MAKER) return quote.toMaker();

    return this.mapToMakerProfile(quote, true);
  }

  @Transactional()
  async createQuote(data: QuoteProperties): Promise<QuoteToClientProperties> {
    const planId = data.planId;
    const makerId = data.makerId;
    const isQuote = await this.repository.exists({ planId, userId: makerId });

    if (isQuote) throw new ConflictError(ErrorMessage.QUOTE_CONFLICT);

    const quoteData = Quote.create(data);
    const quote = await this.repository.create(quoteData);
    return quote.toClient();
  }

  @Transactional()
  async update(id: string, userId: string, data: { isConfirmed: boolean }): Promise<QuoteToClientProperties> {
    const quote = await this.repository.findById(id);

    if (!quote) throw new NotFoundError(ErrorMessage.QUOTE_NOT_FOUND);
    if (userId !== quote.getDreamerId()) {
      throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_DREAMER);
    }

    const dreamer = await this.userService.getUser(quote.getDreamerId());
    if (dreamer.coconut < quote.getConfirmedPrice()) {
      throw new BadRequestError(ErrorMessage.INSUFFICIENT_COCONUTS);
    }

    const planStatus = quote.getPlanStatus();
    if (planStatus !== StatusValues.PENDING) {
      throw new BadRequestError(ErrorMessage.QUOTE_BAD_REQUEST_UPDATE_NOT_PENDING);
    }

    const updatedQuote = await this.repository.update(quote.update(data));

    await this.chatRoomService.postChatRoom(updatedQuote.toChatRoom());

    await this.pointQueue.add('points', {
      userId: quote.getDreamerId(),
      event: PointEventEnum.SPEND,
      value: -quote.getConfirmedPrice()
    });

    return updatedQuote.toClient();
  }

  @Transactional()
  async deleteQuote(id: string, userId: string): Promise<void> {
    const quote = await this.repository.findById(id);

    if (!quote) throw new NotFoundError(ErrorMessage.QUOTE_NOT_FOUND);
    if (userId !== quote.getMakerId()) throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_MAKER);

    if (quote.getPlanStatus() !== StatusValues.PENDING) {
      throw new BadRequestError(ErrorMessage.QUOTE_DELETE_BAD_REQUEST_STATUS);
    }

    await this.repository.delete(id);
  }

  async deleteManyQuotes(planId: string): Promise<void> {
    await this.repository.deleteMany(planId);
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
