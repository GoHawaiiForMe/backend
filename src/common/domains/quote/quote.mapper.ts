import { QuoteMapperProperties } from 'src/common/types/quote/quoteProperties';
import Quote from './quote.domain';
import IQuote from './quote.interface';
import UserMapper from '../user/user.mapper';
import { PlanReference } from 'src/common/types/plan/plan.type';

export default class QuoteMapper {
  constructor(private readonly quote: QuoteMapperProperties) {}

  toDomain(): IQuote {
    let plan: PlanReference;
    if (!this.quote) return null;
    if (!this.quote.plan) plan = null;
    else {
      plan = this.quote.plan;
    }

    return new Quote({
      id: this.quote.id,
      createdAt: this.quote.createdAt,
      updatedAt: this.quote.updatedAt,
      price: this.quote.price,
      content: this.quote.content,
      plan,
      planId: this.quote.planId,
      maker: new UserMapper(this.quote.maker)?.toDomain(),
      makerId: this.quote.makerId,
      isAssigned: this.quote.isAssigned,
      isConfirmed: this.quote.isConfirmed
    });
  }
}
