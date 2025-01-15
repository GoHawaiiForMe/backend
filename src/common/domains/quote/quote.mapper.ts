import { QuoteMapperProperties } from 'src/common/types/quote/quoteProperties';
import Quote from './quote.domain';
import IQuote from './quote.interface';
import { IUser } from '../user/user.interface';
import UserMapper from '../user/user.mapper';
import IPlan from '../plan/plan.interface';
import PlanMapper from '../plan/plan.mapper';

export default class QuoteMapper {
  constructor(private readonly quote: QuoteMapperProperties) {}

  toDomain(): IQuote {
    let maker: IUser | null = null;
    let isAssigned: boolean;
    let isConfirmed: boolean;
    let plan: IPlan = null;

    if (!this.quote) {
      return null;
    }

    if (this?.quote?.plan) {
      plan = new PlanMapper(this.quote.plan).toDomain();
    }

    if (this?.quote?.maker) {
      maker = new UserMapper(this.quote.maker).toDomain();
    }

    if (this.quote.assigneeIds?.length > 0) {
      isAssigned = this.quote.assigneeIds.includes(this.quote.makerId);
    } else {
      isAssigned = this.quote.isAssigned || false;
    } //NOTE. 지정견적인지 확인

    isConfirmed = this.quote.isConfirmed ?? false; //NOTE. 디폴트값 false 지정

    return new Quote({
      id: this.quote.id,
      createdAt: this.quote.createdAt,
      updatedAt: this.quote.updatedAt,
      isDeletedAt: this.quote.isDeletedAt,
      price: this.quote.price,
      content: this.quote.content,
      plan,
      planId: this.quote.planId,
      maker,
      makerId: this.quote.makerId,
      isConfirmed,
      isAssigned
    });
  }
}
