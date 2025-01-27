import { QuoteMapperProperties } from 'src/common/types/quote/quoteProperties';
import Quote from './quote.domain';
import IQuote from './quote.interface';

export default class QuoteMapper {
  constructor(private readonly quote: QuoteMapperProperties) {}

  toDomain(): IQuote {
    if (!this.quote) return null;
    let plan = null;
    let maker = null;
    let dreamer = null;

    if (this.quote.maker) maker = this.quote.maker;

    if (this.quote.plan) {
      const { dreamer: dreamerData, address, ...restPlan } = this.quote.plan;
      plan = restPlan;
      dreamer = dreamerData;
    }

    return new Quote({
      id: this.quote.id,
      createdAt: this.quote.createdAt,
      updatedAt: this.quote.updatedAt,
      price: this.quote.price,
      content: this.quote.content,
      plan,
      planId: this.quote.planId,
      dreamer,
      maker,
      makerId: this.quote.makerId,
      isAssigned: this.quote.isAssigned,
      isConfirmed: this.quote.isConfirmed
    });
  }
}
