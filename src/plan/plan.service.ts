import { Injectable } from '@nestjs/common';
import { Plan, Role, ServiceArea, Status } from '@prisma/client';
import PlanRepository from './plan.repository';
import PlanQueryOptions from './type/planQueryOptions';
import UserRepository from 'src/user/user.repository';
import { IMakerProfile } from 'src/user/domain/profile.interface';
import { IUser } from 'src/user/domain/user.interface';
import ForbiddenError from 'src/common/errors/forbiddenError';
import ErrorMessage from 'src/common/enums/error.message';
import NotFoundError from 'src/common/errors/notFoundError';
import CreatePlanData from './type/createPlanData.interface';
import UpdatePlanData from './type/updatePlanData.interface';
import BadRequestError from 'src/common/errors/badRequestError';
import QuoteService from 'src/quote/quote.service';
import { CreateOptionalQuoteData, CreateQuoteData, QuoteQueryOptions } from 'src/quote/type/quote.type';
import { QuoteProperties, QuoteToClientProperties } from 'src/quote/type/quoteProperties';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FilteredUserProperties } from 'src/user/type/user.types';
import QuoteRepository from 'src/quote/quote.repository';

@Injectable()
export default class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly userRepository: UserRepository,
    private readonly quoteRepository: QuoteRepository,
    private readonly quoteService: QuoteService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async getPlans(makerId: string, options: PlanQueryOptions): Promise<{ list: Plan[]; totalCount: number }> {
    const requestUser: IUser = await this.userRepository.findById(makerId);
    const requestUserRole = requestUser.get().role;
    if (requestUserRole !== Role.MAKER) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_MAKER);
    }
    const makerProfile: IMakerProfile = await this.userRepository.findMakerProfile(makerId);
    const serviceArea: ServiceArea[] = makerProfile.get().serviceArea;
    options.serviceArea = serviceArea;

    const [totalCount, list] = await Promise.all([
      this.planRepository.totalCount(options),
      this.planRepository.findMany(options)
    ]);

    return { list, totalCount };
  }

  async getPlanById(id: string): Promise<Plan> {
    const plan = await this.planRepository.findById(id);
    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }
    return plan;
  }

  async getQuotesByPlanId(
    options: QuoteQueryOptions,
    userId: string
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const { totalCount, list } = await this.quoteService.getQuotesByPlanId(options, userId);
    return { totalCount, list };
  }

  async postPlan(data: CreatePlanData): Promise<Plan> {
    const dreamer = await this.userRepository.findById(data.dreamerId);
    if (dreamer.get().role !== Role.DREAMER) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_DREAMER);
    }

    const plan = await this.planRepository.create(data);
    return plan;
  }

  async postQuote(data: CreateOptionalQuoteData, userId: string, planId: string): Promise<QuoteToClientProperties> {
    const plan = await this.planRepository.findById(planId);

    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }
    const planWithAssignees = plan as Plan & { assignees: FilteredUserProperties[] };
    const assigneeIds = planWithAssignees.assignees.map((user) => user.id);
    const isAssigned = assigneeIds.includes(userId); //NOTE. 지정견적 요청자인지 확인

    data.isAssigned = isAssigned; //TODO. as는 도메인을 쓰면서 해결할 예정
    data.planId = planId; //NOTE. quote 서비스에 값을 전달
    const quoteServiceData = { ...(data as CreateQuoteData), isAssigned };

    const quote = await this.quoteService.createQuote(quoteServiceData, userId);

    return quote;
  }

  async updatePlanAssign(id: string, requestUserId: string, data: Partial<UpdatePlanData>): Promise<Plan> {
    const isPlan = await this.planRepository.findById(id);

    if (!isPlan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }

    if (isPlan.dreamerId !== requestUserId) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_OWNER);
    }

    if (isPlan.status !== Status.PENDING) {
      throw new BadRequestError(ErrorMessage.PLAN_STATUS_INVALID);
    }

    const plan = await this.planRepository.update(id, data);

    // 임시 알림 메시지
    const userId = data.assigneeIds[0]; // 1. assigneeIds -> assigneeId 수정 후 data.assigneeId로 변경
    // 2. 타입 때문에 dreamer.nickName 데이터를 가져올 수 없음 -> 어디서 수정해야 할지???
    // const content = `${plan.dreamer.nickName} 드리머가 지정견적을 요청했어요`
    const content: string = `${plan.dreamerId} 드리머가 지정견적을 요청했어요`;
    this.eventEmitter.emit('notification', { userId, content });

    return plan;
  }
  async updatePlanComplete(id: string, requestUserId: string): Promise<Plan> {
    const isPlan = await this.planRepository.findById(id);

    if (!isPlan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }

    if (isPlan.dreamerId !== requestUserId) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_OWNER);
    }
    const data = { status: Status.COMPLETED };
    const plan = await this.planRepository.update(id, data);
    return plan;
  }

  async deletePlan(id: string, requestUserId: string): Promise<Plan> {
    const plan = await this.planRepository.findById(id);
    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }
    if (plan.dreamerId !== requestUserId) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_OWNER);
    }
    //TODO. 삭제된 플랜의 견적자들에게 알림 필요
    //TODO. 플랜이 삭제될 때 해당 플랜의 견적들도 삭제 필요

    const plan2 = plan as any;
    const quotes = plan2.quotes; //TODO. Plan 도메인 모델 구현 후 수정

    const deletedQuotes = quotes.map((quote) => this.quoteRepository.delete(quote.id));
    const deletedPlan = this.planRepository.delete(id);

    await Promise.all([...deletedQuotes, deletedPlan]);

    return deletedPlan;
  }
}
