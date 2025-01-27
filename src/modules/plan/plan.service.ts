import { Injectable } from '@nestjs/common';
import PlanRepository from './plan.repository';
import QuoteRepository from 'src/modules/quote/quote.repository';
import QuoteService from 'src/modules/quote/quote.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AssignData, PlanQueryOptions } from 'src/common/types/plan/plan.type';
import { PlanToClientProperties } from 'src/common/types/plan/plan.properties';
import NotFoundError from 'src/common/errors/notFoundError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { CreateOptionalQuoteData, QuoteQueryOptions } from 'src/common/types/quote/quote.type';
import { QuoteToClientProperties } from 'src/common/types/quote/quoteProperties';
import { CreatePlanData } from 'src/common/types/plan/plan.type';
import QuoteMapper from 'src/common/domains/quote/quote.mapper';
import ForbiddenError from 'src/common/errors/forbiddenError';
import { ServiceArea } from 'src/common/constants/serviceArea.type';
import { Role, RoleEnum } from 'src/common/constants/role.type';
import PlanMapper from 'src/common/domains/plan/plan.mapper';
import BadRequestError from 'src/common/errors/badRequestError';
import { StatusEnum } from 'src/common/constants/status.type';
import { GroupByCount } from 'src/common/types/plan/plan.dto';
import { NotificationEventName } from 'src/common/types/notification/notification.types';
import UserService from '../user/user.service';

@Injectable()
export default class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly quoteRepository: QuoteRepository,
    private readonly quoteService: QuoteService,
    private readonly userService: UserService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async getPlansByMaker(
    userId: string,
    options: PlanQueryOptions
  ): Promise<{ totalCount: number; groupByCount: GroupByCount; list: PlanToClientProperties[] }> {
    const makerProfile = await this.userService.getProfile(RoleEnum.MAKER, userId);
    const serviceArea: ServiceArea[] = makerProfile.serviceArea;

    options.serviceArea = serviceArea; //NOTE. 메이커의 서비스지역 필터링
    options.userId = userId;
    options.status = [StatusEnum.PENDING];
    options.role = RoleEnum.MAKER;

    const groupOptions = { ...options, tripType: undefined };

    const [totalCount, groupByCount, list] = await Promise.all([
      this.planRepository.totalCount(options),
      this.planRepository.groupByCount(groupOptions),
      this.planRepository.findMany(options)
    ]);

    const toClientList = list.map((plan) => plan.toClient());
    return { totalCount, groupByCount, list: toClientList };
  }

  async getPlansByDreamer(
    userId: string,
    options: PlanQueryOptions
  ): Promise<{ totalCount: number; list: PlanToClientProperties[] }> {
    options.userId = userId;
    const [totalCount, list] = await Promise.all([
      this.planRepository.totalCount(options),
      this.planRepository.findMany(options)
    ]);

    const toClientList = list.map((plan) => plan.toClient());
    return { totalCount, list: toClientList };
  }

  async getPlanById(id: string, userId?: string): Promise<PlanToClientProperties> {
    const plan = await this.planRepository.findById(id);

    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }
    const isPlanDreamer = plan.getDreamerId() === userId;
    const onGoingMaker = plan.getConfirmedMakerId() === userId && plan.getStatus() === StatusEnum.CONFIRMED;

    if (isPlanDreamer || onGoingMaker) {
      return plan.toClientWithAddress();
    }

    return plan.toClient();
  }

  async getQuotesByPlanId(
    options: QuoteQueryOptions,
    userId: string
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const plan = await this.planRepository.findById(options.planId);

    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }

    const dreamerId = plan.getDreamerId();
    if (dreamerId !== userId) {
      throw new ForbiddenError(ErrorMessage.QUOTE_FORBIDDEN_DREAMER);
    }

    const { totalCount, list } = await this.quoteService.getQuotesByPlanId(options);
    return { totalCount, list };
  }

  async postPlan(data: CreatePlanData): Promise<PlanToClientProperties> {
    const domainData = new PlanMapper(data).toDomain();
    const plan = await this.planRepository.create(domainData);
    return plan.toClientWithAddress();
  }

  async postQuote(data: CreateOptionalQuoteData, userId: string, planId: string): Promise<QuoteToClientProperties> {
    const plan = await this.planRepository.findById(planId);

    if (!plan) throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);

    const assigneeIds = plan.getAssigneeIds();
    const isAssigned = assigneeIds.includes(userId);
    const domainQuote = new QuoteMapper({ ...data, planId, isAssigned, makerId: userId }).toDomain();
    const quote = await this.quoteService.createQuote(domainQuote);

    const makerNickName = quote.maker.nickName;
    const tripType = plan.toClient().tripType;
    this.eventEmitter.emit('notification', {
      userId: plan.getDreamerId(),
      event: NotificationEventName.ARRIVE_QUOTE,
      payload: { nickName: makerNickName, tripType }
    });

    return quote;
  }

  async requestPlanAssign(data: AssignData): Promise<PlanToClientProperties> {
    const { id, userId, assigneeId } = data;
    const plan = await this.planRepository.findById(data.id);

    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }

    const assignee = await this.userService.getUser(assigneeId);

    if (!assignee) throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);
    if (assignee.role !== RoleEnum.MAKER) {
      throw new BadRequestError(ErrorMessage.PLAN_ASSIGN_NOT_MAKER);
    }

    plan.requestAssign(data);
    const updatedPlan = await this.planRepository.update(plan);

    const nickName = updatedPlan.getDreamerNickName();
    const tripType = updatedPlan.toClient().tripType;
    this.eventEmitter.emit('notification', {
      userId: assigneeId,
      event: NotificationEventName.ARRIVE_REQUEST,
      payload: { nickName, tripType }
    });

    return updatedPlan.toClient();
  }

  async rejectPlanAssign(data: AssignData): Promise<PlanToClientProperties> {
    const plan = await this.planRepository.findById(data.id);

    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }

    plan.rejectAssign(data);
    const updatedPlan = await this.planRepository.update(plan);

    const makerNickName = plan.getAssigneeNickName(data.assigneeId);
    const planTitle = plan.getTitle();
    this.eventEmitter.emit('notification', {
      userId: data.assigneeId,
      event: NotificationEventName.REJECT_REQUEST,
      payload: { nickName: makerNickName, planTitle }
    });

    return updatedPlan.toClient();
  }

  async updatePlanComplete(id: string, userId: string): Promise<PlanToClientProperties> {
    const plan = await this.planRepository.findById(id);

    if (!plan) throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);

    if (plan.getDreamerId() !== userId) throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_OWNER);

    plan.updateComplete();
    const updatedPlan = await this.planRepository.update(plan);

    return updatedPlan.toClient();
  }

  async autoUpdateStatus(status: StatusEnum.PENDING | StatusEnum.CONFIRMED): Promise<void> {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 1);

    const bufferDate = new Date(today);
    bufferDate.setDate(today.getDate() - 7);

    const tripDate = status === StatusEnum.PENDING ? today : bufferDate;
    const options = {
      status: [status],
      tripDate,
      page: 1,
      pageSize: 100
    };

    let hasMoreData = true;
    while (hasMoreData) {
      const plans = await this.planRepository.findMany(options);

      if (plans.length === 0) {
        hasMoreData = false;
        break;
      }

      const update = plans.map(async (plan) => {
        plan.updateByScheduler();
        await this.planRepository.update(plan);
      });

      await Promise.allSettled(update);
    }
  }

  async deletePlan(id: string, userId: string): Promise<PlanToClientProperties> {
    const plan = await this.planRepository.findById(id);

    if (!plan) throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);

    if (plan.getDreamerId() !== userId) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_OWNER);
    }

    if (plan.getStatus() === StatusEnum.CONFIRMED) {
      throw new BadRequestError(ErrorMessage.PLAN_DELETE_BAD_REQUEST);
    }

    const quotes = plan.getQuoteIds();
    const deletedQuotes = quotes.map(async (quoteId) => this.quoteRepository.delete(quoteId));
    const deletedPlan = await this.planRepository.delete(id);

    await Promise.all([...deletedQuotes, deletedPlan]);

    const dreamerNickName = plan.getDreamerNickName();
    const planTitle = plan.getTitle();

    const makerIds = deletedPlan.getQuoteMakerIds();
    makerIds.map((id) =>
      this.eventEmitter.emit('notification', {
        userId: id,
        event: NotificationEventName.REJECT_QUOTE,
        payload: { nickName: dreamerNickName, planTitle }
      })
    );

    return deletedPlan.toClient();
  }
}
