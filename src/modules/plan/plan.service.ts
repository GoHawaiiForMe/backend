import { Injectable } from '@nestjs/common';
import PlanRepository from './plan.repository';
import QuoteRepository from 'src/modules/quote/quote.repository';
import QuoteService from 'src/modules/quote/quote.service';
import UserRepository from 'src/modules/user/user.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PlanQueryOptions } from 'src/common/types/plan/plan.type';
import IPlan from 'src/common/domains/plan/plan.interface';
import { PlanToClientProperties } from 'src/common/types/plan/plan.properties';
import NotFoundError from 'src/common/errors/notFoundError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { CreateOptionalQuoteData, QuoteQueryOptions } from 'src/common/types/quote/quote.type';
import { QuoteToClientProperties } from 'src/common/types/quote/quoteProperties';
import { CreatePlanData } from 'src/common/types/plan/plan.type';
import QuoteMapper from 'src/common/domains/quote/quote.mapper';
import ForbiddenError from 'src/common/errors/forbiddenError';
import { IUser } from 'src/common/domains/user/user.interface';
import { IMakerProfile } from 'src/common/domains/user/profile.interface';
import { ServiceArea } from 'src/common/constants/serviceArea.type';
import { RoleEnum } from 'src/common/constants/role.type';
import PlanMapper from 'src/common/domains/plan/plan.mapper';
import BadRequestError from 'src/common/errors/badRequestError';
import { StatusEnum } from 'src/common/constants/status.type';

@Injectable()
export default class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly quoteRepository: QuoteRepository,
    private readonly quoteService: QuoteService,
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async getPlans(
    userId: string,
    options: PlanQueryOptions
  ): Promise<{ totalCount: number; list: PlanToClientProperties[] }> {
    const { keyword, tripType } = options;
    const requestUser: IUser = await this.userRepository.findById(userId);
    const requestUserRole = requestUser.get().role;

    const makerProfile: IMakerProfile = await this.userRepository.findMakerProfile(userId);
    const serviceArea: ServiceArea[] = makerProfile.get().serviceArea;
    options.serviceArea = serviceArea; //NOTE. 메이커의 서비스지역 필터링
    options.userId = userId;

    const [totalCount, list] = await Promise.all([
      this.planRepository.totalCount(options),
      this.planRepository.findMany(options)
    ]);

    const toClientList = list.map((plan) => plan.toClient());
    return { totalCount, list: toClientList };
  }

  async getMyPlans(
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

  async getPlanById(id: string): Promise<PlanToClientProperties> {
    const plan = await this.planRepository.findById(id);

    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
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

    const { totalCount, list } = await this.quoteService.getQuotesByPlanId(options, userId);
    return { totalCount, list };
  }

  async postPlan(data: CreatePlanData): Promise<PlanToClientProperties> {
    const domainData = new PlanMapper(data).toDomain();
    const plan = await this.planRepository.create(domainData);
    return plan.toClient();
  }

  async postQuote(data: CreateOptionalQuoteData, userId: string, planId: string): Promise<QuoteToClientProperties> {
    const plan = await this.planRepository.findById(planId);

    if (!plan) throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);

    const assigneeIds = plan.getAssigneeIds();
    const isAssigned = assigneeIds.includes(userId);
    const domainQuote = new QuoteMapper({ ...data, planId, isAssigned, makerId: userId }).toDomain();
    const quote = await this.quoteService.createQuote(domainQuote);

    return quote;
  }

  async updatePlanAssign(id: string, userId: string, data: { assigneeId: string }): Promise<PlanToClientProperties> {
    const assignee = await this.userRepository.findById(data.assigneeId);
    const plan = await this.planRepository.findById(id);

    if (!assignee) throw new NotFoundError(ErrorMessage.USER_NOT_FOUND);

    if (assignee.getRole() !== RoleEnum.MAKER) {
      throw new BadRequestError(ErrorMessage.PLAN_ASSIGN_NOT_MAKER);
    }

    if (!plan) throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);

    if (plan.getDreamerId() !== userId) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_OWNER);
    }

    plan.updateAssign(data);
    const updatedPlan = await this.planRepository.update(plan);

    const assigneeId = data.assigneeId; //NOTE. 알림
    const content: string = `${plan.getDreamerNickName()} 드리머가 지정견적을 요청했어요`;
    this.eventEmitter.emit('notification', { assigneeId, content });

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

  async deletePlan(id: string, userId: string): Promise<PlanToClientProperties> {
    const plan = await this.planRepository.findById(id);

    if (!plan) throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);

    if (plan.getDreamerId() !== userId) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_OWNER);
    }

    if (plan.getStatus() === StatusEnum.CONFIRMED) {
      throw new BadRequestError(ErrorMessage.PLAN_DELETE_BAD_REQUEST);
    }
    //TODO. 삭제된 플랜의 견적자들에게 알림 필요

    const quotes = plan.getQuotes();
    const quoteIds = quotes.map((quote) => quote.getId());

    const deletedQuotes = quotes.map(async (quote) => this.quoteRepository.delete(quote.getId()));
    const deletedPlan = await this.planRepository.delete(id);

    await Promise.all([...deletedQuotes, deletedPlan]);

    return deletedPlan.toClient();
  }
}
