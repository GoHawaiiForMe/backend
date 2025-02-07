import { TripType, TripTypeValues } from 'src/common/constants/tripType.type';
import IPlan from './plan.interface';
import { ServiceArea } from 'src/common/constants/serviceArea.type';
import { Status, StatusValues } from 'src/common/constants/status.type';
import { PlanProperties, PlanToClientProperties } from 'src/common/types/plan/plan.properties';
import ConflictError from 'src/common/errors/conflictError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import BadRequestError from 'src/common/errors/badRequestError';
import { AssignData } from 'src/common/types/plan/plan.type';
import ForbiddenError from 'src/common/errors/forbiddenError';
import { UserReference } from 'src/common/types/user/user.types';
import { ProfileImage } from 'src/common/constants/image.type';

export default class Plan implements IPlan {
  private id?: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private title: string;
  private tripDate: Date;
  private tripType: TripType;
  private serviceArea: ServiceArea;
  private details: string;
  private address?: string;
  private status?: Status;
  private quotes?: {
    id?: string;
    makerId?: string;
    isConfirmed?: boolean;
    price?: number;
    maker?: {
      id: string;
      nickName: string;
      image?: ProfileImage;
    };
  }[];
  private assignees?: UserReference[];
  private assigneeId?: string;
  private isAssigned: boolean;
  private dreamer?: UserReference | null;
  private dreamerId?: string | null;

  constructor(planProperties: PlanProperties) {
    this.id = planProperties.id;
    this.createdAt = planProperties.createdAt;
    this.updatedAt = planProperties.updatedAt;
    this.title = planProperties.title;
    this.tripDate = planProperties.tripDate;
    this.tripType = planProperties.tripType;
    this.serviceArea = planProperties.serviceArea;
    this.details = planProperties.details;
    this.address = planProperties.address;
    this.status = planProperties.status;
    this.quotes = planProperties.quotes; // 타입보다 더 많은거는 신경 안씀
    this.assignees = planProperties.assignees;
    this.dreamer = planProperties.dreamer;
    this.dreamerId = planProperties.dreamerId;
  }

  static create(data: PlanProperties): IPlan {
    return new Plan(data);
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
      status: this.status,
      assignees: this.assignees,
      dreamer: this.dreamer
    };
  }

  toClientWithAddress(): PlanToClientProperties {
    if (this.tripType !== TripTypeValues.SHOPPING) return this.toClient();
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      title: this.title,
      tripDate: this.tripDate,
      tripType: this.tripType,
      serviceArea: this.serviceArea,
      details: this.details,
      address: this.address,
      status: this.status,
      assignees: this.assignees,
      dreamer: this.dreamer
    };
  }

  toClientWithQuotes(): PlanToClientProperties {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      title: this.title,
      tripDate: this.tripDate,
      tripType: this.tripType,
      serviceArea: this.serviceArea,
      details: this.details,
      address: this.address,
      status: this.status,
      assignees: this.assignees,
      dreamer: this.dreamer,
      quotes: this.quotes
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
      assigneeId: this.assigneeId,
      isAssigned: this.isAssigned
    };
  }

  requestAssign(data: AssignData): IPlan {
    const { userId, assigneeId } = data;

    if (this.dreamerId !== userId) {
      throw new ForbiddenError(ErrorMessage.PLAN_UPDATE_FORBIDDEN);
    }

    if (this.getAssigneeIds().includes(assigneeId)) {
      throw new ConflictError(ErrorMessage.PLAN_ASSIGN_CONFLICT);
    } //NOTE. 지정경적 요청을 한 사람이 중복인지 체크

    if (this.getStatus() !== StatusValues.PENDING) {
      throw new BadRequestError(ErrorMessage.PLAN_ASSIGN_NOT_PENDING);
    } //NOTE. PENDING 상태인지 체크
    this.assigneeId = assigneeId;
    this.isAssigned = true;

    return this;
  }

  rejectAssign(data: AssignData): IPlan {
    const { assigneeId } = data;

    if (!this.getAssigneeIds().includes(assigneeId)) {
      throw new ConflictError(ErrorMessage.PLAN_ASSIGN_BAD_REQUEST);
    } //NOTE. 지정경적 요청을 받은사람이 맞는지 체크

    if (this.getStatus() !== StatusValues.PENDING) {
      throw new BadRequestError(ErrorMessage.PLAN_ASSIGN_NOT_PENDING);
    } //NOTE. PENDING 상태인지 체크
    this.assigneeId = assigneeId;
    this.isAssigned = false;

    return this;
  }

  updateComplete(): IPlan {
    if (this.status !== StatusValues.CONFIRMED) {
      throw new BadRequestError(ErrorMessage.PLAN_COMPLETED_BAD_REQUEST);
    }

    this.status = StatusValues.COMPLETED;
    return this;
  }

  updateByScheduler(): IPlan {
    if (this.status === StatusValues.PENDING) this.status = StatusValues.OVERDUE;
    else if (this.status === StatusValues.CONFIRMED) this.status = StatusValues.COMPLETED;
    return this;
  }

  getQuoteIds(): string[] {
    return this.quotes.map((quote) => quote.id);
  }

  getQuoteMakerIds(): string[] {
    return this.quotes.map((quote) => quote.makerId);
  }

  getConfirmedMakerId(): string {
    const confirmedQuote = this.quotes?.find((quote) => quote.isConfirmed === true);
    return confirmedQuote?.makerId ?? null;
  }

  getAssigneeIds(): string[] {
    return this.assignees.map((assignee) => assignee.id);
  }
  getDreamerId(): string {
    return this.dreamerId;
  }

  getDreamerNickName(): string {
    return this.dreamer.nickName;
  }

  getAssigneeNickName(makerId: string): string {
    const maker = this.assignees.find((user) => user.id === makerId);
    return maker.nickName;
  }

  getStatus(): Status {
    return this.status;
  }

  getTitle(): string {
    return this.title;
  }

  getTripType(): TripType {
    return this.tripType;
  }
}
