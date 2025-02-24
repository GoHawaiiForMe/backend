import { Injectable } from '@nestjs/common';
import PlanRepository from './plan.repository';
import QuoteService from 'src/modules/quote/quote.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AssignData, GroupByCount, PlanQueryOptions } from 'src/modules/plan/types/plan.type';
import { PlanToClientProperties } from 'src/modules/plan/types/plan.properties';
import NotFoundError from 'src/common/errors/notFoundError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { CreateOptionalQuoteData, QuoteQueryOptions } from 'src/modules/quote/types/quote.type';
import { QuoteToClientProperties } from 'src/modules/quote/types/quoteProperties';
import { CreatePlanData } from 'src/modules/plan/types/plan.type';
import ForbiddenError from 'src/common/errors/forbiddenError';
import { ServiceArea } from 'src/common/constants/serviceArea.type';
import { RoleValues } from 'src/common/constants/role.type';
import BadRequestError from 'src/common/errors/badRequestError';
import { StatusValues } from 'src/common/constants/status.type';
import { NotificationEventName } from 'src/modules/notification/types/notification.types';
import UserService from '../user/user.service';
import Plan from './domain/plan.domain';
import ChatRoomService from '../chatRoom/chatRoom.service';
import GroupField from 'src/common/constants/groupByField.enum';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PointEventEnum } from 'src/common/constants/pointEvent.type';
import TransactionManager from 'src/providers/database/transaction/transaction.manager';
import Transactional from 'src/common/decorators/transaction.decorator';
import ProfileService from '../profile/profile.service';

@Injectable()
export default class PlanService {
  constructor(
    @InjectQueue('points') private readonly pointQueue: Queue,
    private readonly repository: PlanRepository,
    private readonly quoteService: QuoteService,
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly chatRoomService: ChatRoomService,
    private readonly transactionManager: TransactionManager,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async getPlanGroupCount(serviceArea: ServiceArea): Promise<{ totalCount: number; groupByCount: GroupByCount }> {
    const totalCountOptions = serviceArea ? { serviceArea: [serviceArea] } : {};
    const groupCountOptions = serviceArea
      ? { groupByField: GroupField.TRIP_TYPE, serviceArea: [serviceArea] }
      : { groupByField: GroupField.SERVICE_AREA };

    const [totalCount, groupByCount] = await Promise.all([
      this.repository.totalCount(totalCountOptions),
      this.repository.groupByCount(groupCountOptions)
    ]);
    return { totalCount, groupByCount };
  }

  async getPlansByMaker(
    userId: string,
    options: PlanQueryOptions
  ): Promise<{ totalCount: number; groupByCount: GroupByCount; list: PlanToClientProperties[] }> {
    const makerProfile = await this.profileService.getProfile(RoleValues.MAKER, userId);
    const serviceArea: ServiceArea[] = options.isAssigned === true ? undefined : makerProfile.serviceArea;

    options.serviceArea = serviceArea; //NOTE. 메이커의 서비스지역 필터링
    options.userId = userId;
    options.status = [StatusValues.PENDING];
    options.role = RoleValues.MAKER;
    options.groupByField = GroupField.TRIP_TYPE;

    const groupOptions = { ...options, tripType: undefined };

    const [totalCount, groupByCount, list] = await Promise.all([
      this.repository.totalCount(options),
      this.repository.groupByCount(groupOptions),
      this.repository.findMany(options)
    ]);

    const toClientList = list.map((plan) => plan.toClient());
    return { totalCount, groupByCount, list: toClientList };
  }

  async getPlansByDreamer(
    userId: string,
    options: PlanQueryOptions
  ): Promise<{ totalCount: number; list: PlanToClientProperties[] }> {
    const { reviewed, readyToComplete } = options || {};
    const isReviewQuery = reviewed === true || reviewed === false;
    const isWithQuote = isReviewQuery || readyToComplete;

    options.userId = userId;
    if (isReviewQuery) options.status = [StatusValues.COMPLETED]; //NOTE. status COMPLETE 지정

    if (readyToComplete) {
      const today = new Date(); //NOTE. 완료할 수 있는 플랜 필터링
      const koreaTime = today.toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
      const tripDate = new Date(koreaTime.split(',')[0]);
      options.status = [StatusValues.CONFIRMED];
      options.tripDate = tripDate; //NOTE. CONFIRMED 상태로 지정 및 tripDate 지정
    }

    const [totalCount, list] = await Promise.all([
      this.repository.totalCount(options),
      this.repository.findMany(options)
    ]);

    const toClientList = list.map((plan) => (isWithQuote ? plan.toClientWithQuotes() : plan.toClient()));
    return { totalCount, list: toClientList };
  }

  async getPlanById(id: string, userId?: string): Promise<PlanToClientProperties> {
    const plan = await this.repository.findById(id);

    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }
    const isPlanDreamer = plan.getDreamerId() === userId;
    const onGoingMaker = plan.getConfirmedMakerId() === userId && plan.getStatus() === StatusValues.CONFIRMED;

    if (isPlanDreamer || onGoingMaker) {
      return plan.toClientWithAddress();
    }

    return plan.toClient();
  }

  async getQuotesByPlanId(
    options: QuoteQueryOptions,
    userId: string
  ): Promise<{ totalCount: number; list: QuoteToClientProperties[] }> {
    const plan = await this.repository.findById(options.planId);

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
    const domainData = Plan.create(data);
    const plan = await this.repository.create(domainData);
    return plan.toClientWithAddress();
  }

  @Transactional()
  async postQuote(data: CreateOptionalQuoteData, userId: string, planId: string): Promise<QuoteToClientProperties> {
    const plan = await this.repository.findById(planId);

    if (!plan) throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);

    const assigneeIds = plan.getAssigneeIds();
    const isAssigned = assigneeIds.includes(userId);
    const quote = await this.quoteService.createQuote({ ...data, planId, isAssigned, makerId: userId });

    const makerNickName = quote.maker.nickName;
    const tripType = plan.getTripType();
    this.eventEmitter.emit('notification', {
      userId: plan.getDreamerId(),
      event: NotificationEventName.ARRIVE_QUOTE,
      payload: { nickName: makerNickName, tripType }
    });

    return quote;
  }

  @Transactional()
  async requestPlanAssign(data: AssignData): Promise<PlanToClientProperties> {
    const { id, userId, assigneeId } = data;
    const plan = await this.repository.findById(data.id);

    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }

    const assignee = await this.userService.getUser(assigneeId);

    if (!assignee) throw new BadRequestError(ErrorMessage.USER_NOT_FOUND);
    if (assignee.role !== RoleValues.MAKER) {
      throw new BadRequestError(ErrorMessage.PLAN_ASSIGN_NOT_MAKER);
    }

    const assigneeServiceArea = (await this.profileService.getProfile(RoleValues.MAKER, assigneeId)).serviceArea;
    if (!assigneeServiceArea.includes(plan.getServiceArea())) {
      throw new BadRequestError(ErrorMessage.PLAN_MAKER_NOT_IN_SERVICE_AREA);
    }

    plan.requestAssign(data);

    const updatedPlan = await this.repository.update(plan);

    const nickName = updatedPlan.getDreamerNickName();
    const tripType = updatedPlan.getTripType();
    this.eventEmitter.emit('notification', {
      userId: assigneeId,
      event: NotificationEventName.ARRIVE_REQUEST,
      payload: { nickName, tripType }
    });

    return updatedPlan.toClient();
  }

  @Transactional()
  async rejectPlanAssign(data: AssignData): Promise<PlanToClientProperties> {
    const plan = await this.repository.findById(data.id);

    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }

    plan.rejectAssign(data);
    const updatedPlan = await this.repository.update(plan);

    const makerNickName = plan.getAssigneeNickName(data.assigneeId);
    const dreamerNickName = plan.getDreamerNickName();
    const dreamerId = plan.getDreamerId();
    const planTitle = plan.getTitle();
    // this.eventEmitter.emit('notification', {
    //   userId: data.assigneeId,
    //   event: NotificationEventName.REJECT_REQUEST,
    //   payload: { nickName: makerNickName, planTitle }
    // });
    this.eventEmitter.emit('notification', {
      userId: dreamerId,
      event: NotificationEventName.REJECT_REQUEST,
      payload: { nickName: dreamerNickName, planTitle }
    });

    return updatedPlan.toClient();
  }

  @Transactional()
  async updatePlanComplete(id: string, userId: string): Promise<PlanToClientProperties> {
    const plan = await this.repository.findById(id);

    if (!plan) throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    if (plan.getDreamerId() !== userId) throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_OWNER);

    plan.updateComplete();
    const updatedPlan = await this.repository.update(plan);
    const planId = plan.getId();

    await this.chatRoomService.deActive(planId);
    await this.pointQueue.add('points', {
      userId: plan.getConfirmedMakerId(),
      event: PointEventEnum.EARN,
      value: plan.getConfirmedPrice()
    });

    return updatedPlan.toClient();
  }

  async autoUpdateStatus(status: typeof StatusValues.PENDING | typeof StatusValues.CONFIRMED): Promise<void> {
    const updateStatus = status === StatusValues.PENDING ? StatusValues.OVERDUE : StatusValues.COMPLETED;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    today.setDate(today.getDate() + 1);

    const bufferDate = new Date(today);
    bufferDate.setDate(today.getDate() - 7);

    const tripDate = status === StatusValues.PENDING ? today : bufferDate;
    const options = {
      status: [status],
      tripDate,
      page: 1,
      pageSize: 100
    };

    let hasMoreData = true;
    while (hasMoreData) {
      const plans = await this.repository.findMany(options);

      if (plans.length === 0) {
        hasMoreData = false;
        break;
      }
      const planIds = plans.map((plan) => {
        plan.updateByScheduler();
        return plan.getId();
      });

      await this.repository.updateMany({ ids: planIds, status: updateStatus });
      if (status === StatusValues.CONFIRMED) {
        await this.chatRoomService.deActiveMany(planIds);

        plans.map(async (plan) => {
          await this.pointQueue.add('points', {
            userId: plan.getConfirmedMakerId(),
            event: PointEventEnum.EARN,
            value: plan.getConfirmedPrice()
          });
        });
      }
    }
  }

  @Transactional()
  async deletePlan(id: string, userId: string): Promise<PlanToClientProperties> {
    const plan = await this.repository.findById(id);

    if (!plan) throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);

    if (plan.getDreamerId() !== userId) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_OWNER);
    }

    if (plan.getStatus() === StatusValues.CONFIRMED) {
      throw new BadRequestError(ErrorMessage.PLAN_DELETE_BAD_REQUEST);
    }
    const quotes = plan.getQuoteIds();

    await this.quoteService.deleteManyQuotes(id);
    const deletedPlan = await this.repository.delete(id);

    const dreamerNickName = deletedPlan.getDreamerNickName();
    const planTitle = deletedPlan.getTitle();

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
