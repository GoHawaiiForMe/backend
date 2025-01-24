import { TripType } from 'src/common/constants/tripType.type';
import IPlan from './plan.interface';
import { ServiceArea } from 'src/common/constants/serviceArea.type';
import { Status, StatusEnum } from 'src/common/constants/status.type';
import IQuote from '../quote/quote.interface';
import { IUser } from '../user/user.interface';
import { Review } from '@prisma/client';
import { PlanProperties, PlanToClientProperties } from 'src/common/types/plan/plan.properties';
import ConflictError from 'src/common/errors/conflictError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import BadRequestError from 'src/common/errors/badRequestError';

export default class Plan implements IPlan {
  private id?: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private isDeletedAt?: Date | null;
  private title: string;
  private tripDate: Date;
  private tripType: TripType;
  private serviceArea: ServiceArea;
  private details: string;
  private address?: string;
  private status: Status;
  private quotes: IQuote[];
  private assignees: IUser[];
  private assigneeId?: string;
  private dreamer?: IUser | null;
  private dreamerId?: string | null;
  private review: Review;

  constructor(planProperties: PlanProperties) {
    this.id = planProperties.id;
    this.createdAt = planProperties.createdAt;
    this.updatedAt = planProperties.updatedAt;
    this.isDeletedAt = planProperties.isDeletedAt;
    this.title = planProperties.title;
    this.tripDate = planProperties.tripDate;
    this.tripType = planProperties.tripType;
    this.serviceArea = planProperties.serviceArea;
    this.details = planProperties.details;
    this.address = planProperties.address;
    this.status = planProperties.status;
    this.quotes = planProperties.quotes;
    this.assignees = planProperties.assignees;
    this.dreamer = planProperties.dreamer;
    this.dreamerId = planProperties.dreamerId;
    this.review = planProperties.review;
  }

  toClient(): PlanToClientProperties {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      title: this.title,
      tripDate: this.tripDate,
      tripType: this.tripType,
      serviceArea: this.serviceArea,
      details: this.details,
      //address: this.address, //TODO. 컨펌이 되면 리스폰스로 돌려줘야함 상의필요.
      status: this.status,
      quotes: this.quotes?.map((quote) => quote?.toClient()),
      assignees: this.assignees?.map((assignee) => assignee?.toClient()),
      dreamer: this.dreamer?.toClient(),
      review: this.review
    };
  }
  toDB(): Partial<PlanProperties> {
    return {
      id: this.id,
      title: this.title,
      tripDate: this.tripDate,
      tripType: this.tripType,
      serviceArea: this.serviceArea,
      details: this.details,
      address: this.address,
      status: this.status,
      dreamerId: this.dreamerId,
      assigneeId: this.assigneeId
    };
  }

  updateAssign(data: { assigneeId: string }): IPlan {
    const { assigneeId } = data;
    if (this.getAssigneeIds().includes(assigneeId)) {
      throw new ConflictError(ErrorMessage.PLAN_ASSIGN_CONFLICT);
    } //NOTE. 지정경적 요청을 한 사람이 중복인지 체크

    if (this.getStatus() !== StatusEnum.PENDING) {
      throw new BadRequestError(ErrorMessage.PLAN_ASSIGN_NOT_PENDING);
    } //NOTE. PENDING 상태인지 체크

    this.assigneeId = assigneeId;
    return this;
  }

  updateComplete(): IPlan {
    if (this.status !== StatusEnum.CONFIRMED) {
      throw new BadRequestError(ErrorMessage.PLAN_COMPLETED_BAD_REQUEST);
    }

    this.status = StatusEnum.COMPLETED;
    return this;
  }

  updateByScheduler(): IPlan {
    if (this.status === StatusEnum.PENDING) this.status = StatusEnum.OVERDUE;
    else if (this.status === StatusEnum.CONFIRMED) this.status = StatusEnum.COMPLETED;
    return this;
  }

  getQuotes(): IQuote[] {
    return this.quotes;
  }
  getAssigneeIds(): string[] {
    return this.assignees.map((assignee) => assignee.getId());
  }
  getDreamerId(): string {
    return this.dreamerId;
  }

  getConfirmedMakerId(): string {
    const confirmedQuote = this.quotes.find((quote) => quote.getIsConfirmed() === true);
    const makerId = confirmedQuote.getMakerId();

    return makerId;
  }

  getDreamerNickName(): string {
    return this.dreamer.toClient().nickName;
  }
  getStatus(): Status {
    return this.status;
  }
}
