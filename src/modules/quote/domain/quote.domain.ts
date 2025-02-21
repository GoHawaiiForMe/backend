import IQuote from './quote.interface';
import ConflictError from 'src/common/errors/conflictError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { QuoteProperties, QuoteToClientProperties } from 'src/modules/quote/types/quoteProperties';
import { Status, StatusValues } from 'src/common/constants/status.type';
import { PlanReference } from 'src/modules/plan/types/plan.type';
import { UserReference } from 'src/modules/user/types/user.types';
import { toChatRoomData } from 'src/modules/quote/types/quote.type';
import { TripTypeValues } from 'src/common/constants/tripType.type';

export default class Quote implements IQuote {
  private id?: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private price: number;
  private content: string;
  private plan?: PlanReference;
  private dreamerAddress?: string;
  private planId: string;
  private dreamer?: UserReference;
  private maker?: UserReference;
  private makerId?: string;
  private isConfirmed: boolean;
  private isAssigned: boolean;

  constructor(quoteProperties: QuoteProperties) {
    this.id = quoteProperties?.id;
    this.createdAt = quoteProperties?.createdAt;
    this.updatedAt = quoteProperties?.updatedAt;
    this.price = quoteProperties.price;
    this.content = quoteProperties.content;
    this.plan = quoteProperties.plan;
    this.dreamerAddress = quoteProperties.dreamerAddress;
    this.planId = quoteProperties.planId;
    this.dreamer = quoteProperties?.dreamer;
    this.maker = quoteProperties?.maker;
    this.makerId = quoteProperties?.makerId;
    this.isConfirmed = quoteProperties?.isConfirmed || false;
    this.isAssigned = quoteProperties.isAssigned;
  }
  static create(data: QuoteProperties): IQuote {
    return new Quote(data);
  }

  update(data: Partial<QuoteProperties>): IQuote {
    this.isConfirmed = data.isConfirmed;
    return this;
  }

  toDBForUpdate(): Partial<QuoteProperties> {
    return {
      id: this.id,
      isConfirmed: this.isConfirmed
    };
  }

  toDB(): Partial<QuoteProperties> {
    return {
      id: this.id,
      price: this.price,
      content: this.content,
      planId: this.planId,
      makerId: this.makerId,
      isConfirmed: this.isConfirmed,
      isAssigned: this.isAssigned
    };
  }

  toClient(): QuoteToClientProperties {
    const showAddress = this.plan.tripType === TripTypeValues.SHOPPING;
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      price: this.price,
      content: this.content,
      plan: showAddress ? { ...this.plan, address: this.dreamerAddress } : this.plan,
      maker: this.maker,
      isConfirmed: this.isConfirmed,
      isAssigned: this.isAssigned
    };
  }

  toMaker(): QuoteToClientProperties {
    const showAddress =
      this.plan.status === StatusValues.CONFIRMED &&
      this.plan.tripType === TripTypeValues.SHOPPING &&
      this.isConfirmed === true;
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      price: this.price,
      content: this.content,
      plan: showAddress ? { ...this.plan, address: this.dreamerAddress } : this.plan,
      dreamer: this.dreamer,
      maker: this.maker,
      isConfirmed: this.isConfirmed,
      isAssigned: this.isAssigned
    };
  }

  toClientWithoutPlan(): QuoteToClientProperties {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      price: this.price,
      content: this.content,
      maker: this.maker,
      isConfirmed: this.isConfirmed,
      isAssigned: this.isAssigned
    };
  }

  toChatRoom(): toChatRoomData {
    return {
      userIds: [this.dreamer.id, this.makerId],
      planId: this.planId,
      planTitle: this.plan.title,
      planTripDate: this.plan.tripDate,
      quotePrice: this.price
    };
  }

  getId(): string {
    return this.id;
  }

  getMakerId(): string {
    return this.makerId;
  }

  getDreamerId(): string {
    return this.dreamer?.id;
  }

  getPlanId(): string {
    return this.planId;
  }

  getPlanStatus(): Status {
    return this.plan.status;
  }

  getIsConfirmed(): boolean {
    return this.isConfirmed;
  }

  getConfirmedPrice(): number {
    return this.price;
  }
}
