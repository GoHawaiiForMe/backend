import IQuote from './quote.interface';
import ConflictError from 'src/common/errors/conflictError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { IUser } from '../user/user.interface';
import { QuoteProperties, QuoteToClientProperties } from 'src/common/types/quote/quoteProperties';
import { Status } from 'src/common/constants/status.type';
import { PlanReference } from 'src/common/types/plan/plan.type';

export default class Quote implements IQuote {
  private id?: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private price: number;
  private content: string;
  private plan: PlanReference;
  private planId: string;
  private maker?: IUser;
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
    this.planId = quoteProperties.planId;
    this.maker = quoteProperties?.maker;
    this.makerId = quoteProperties?.makerId;
    this.isConfirmed = quoteProperties?.isConfirmed || false;
    this.isAssigned = quoteProperties.isAssigned;
  }

  update(data: Partial<QuoteProperties>): IQuote {
    if (this.isConfirmed === data.isConfirmed) {
      throw new ConflictError(ErrorMessage.QUOTE_CONFLICT_IS_CONFIRMED);
    }
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
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      price: this.price,
      content: this.content,
      plan: this.plan,
      maker: this.maker?.toClient(),
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
      maker: this.maker?.toClient(),
      isConfirmed: this.isConfirmed,
      isAssigned: this.isAssigned
    };
  }

  getId(): string {
    return this.id;
  }

  getMakerId(): string {
    return this.makerId;
  }

  getDreamerId(): string {
    return this.plan.dreamer.id;
  }

  getPlanId(): string {
    return this.planId;
  }
  getPlanStatus(): Status {
    return this.plan.status;
  }
}
