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
    if (!this.quote) return null;

    return new Quote({
      id: this.quote.id,
      createdAt: this.quote.createdAt,
      updatedAt: this.quote.updatedAt,
      isDeletedAt: this.quote.isDeletedAt,
      price: this.quote.price,
      content: this.quote.content,
      plan: new PlanMapper(this.quote.plan)?.toDomain(),
      planId: this.quote.planId,
      maker: new UserMapper(this.quote.maker)?.toDomain(),
      makerId: this.quote.makerId,
      isAssigned: this.quote.isAssigned,
      isConfirmed: this.quote.isConfirmed
    });
  }
}
