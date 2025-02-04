import { QuoteMapperProperties } from 'src/common/types/quote/quoteProperties';
import Quote from './quote.domain';
import IQuote from './quote.interface';

export default class QuoteMapper {
  constructor(private readonly quote: QuoteMapperProperties) {}

  toDomain(): IQuote {
    if (!this.quote) return null;

    const { dreamer, address, ...restPlan } = this.quote.plan || {};

    return new Quote({
      id: this.quote.id,
      createdAt: this.quote.createdAt,
      updatedAt: this.quote.updatedAt,
      price: this.quote.price,
      content: this.quote.content,
      plan: restPlan,
      shoppingAddress: address,
      planId: this.quote.planId,
      dreamer,
      maker: this.quote.maker ?? null,
      makerId: this.quote.makerId,
      isAssigned: this.quote.isAssigned,
      isConfirmed: this.quote.isConfirmed
    });
  }
}
