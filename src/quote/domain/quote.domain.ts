import { Plan } from '@prisma/client';
import IQuote from './quote.interface';
import { QuoteProperties } from '../type/quoteProperties';
import { IUser } from 'src/user/domain/user.interface';
import { QuoteToClientProperties } from '../type/quoteProperties';
import ConflictError from 'src/common/errors/conflictError';
import ErrorMessage from 'src/common/enums/error.message';

export default class Quote implements IQuote {
  private id?: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private isDeletedAt?: Date | null;
  private price: number;
  private content: string;
  private plan: Plan;
  private planId: string;
  private maker?: IUser;
  private makerId?: string;
  private isConfirmed: boolean;
  private isAssigned: boolean;

  constructor(quoteProperties: QuoteProperties) {
    this.id = quoteProperties?.id;
    this.createdAt = quoteProperties?.createdAt;
    this.updatedAt = quoteProperties?.updatedAt;
    this.isDeletedAt = quoteProperties?.isDeletedAt;
    this.price = quoteProperties.price;
    this.content = quoteProperties.content;
    this.plan = quoteProperties.plan;
    this.planId = quoteProperties.planId;
    this.maker = quoteProperties?.maker;
    this.makerId = quoteProperties?.makerId;
    this.isConfirmed = quoteProperties?.isConfirmed;
    this.isAssigned = quoteProperties.isAssigned;
  }

  update(data: Partial<QuoteProperties>): IQuote {
    // isConfirmed 필드의 상태 변경에 대해 예외 처리 (정확한 예외 조건 필요)
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
      maker: this.maker?.toClient() ?? null,
      isConfirmed: this.isConfirmed,
      isAssigned: this.isAssigned
    };
  }

  getMakerId(): string {
    return this.makerId;
  }

  getDreamerId(): string {
    return this.plan.dreamerId;
  }
}
//TODO. 생성 떄는 모든 데이터 반환, 업데이트시에는 업데이트 한 메소드만 반환하게 수정 필요.
