import Quote from './quote.domain';
import { QuoteMapperProperties } from '../type/quoteProperties';
import { IUser } from 'src/core/user/domain/user.interface';
import UserMapper from 'src/core/user/domain/user.mapper';
import IQuote from './quote.interface';

export default class QuoteMapper {
  constructor(private readonly quote: QuoteMapperProperties) {}

  toDomain(): IQuote {
    let maker: IUser | null = null;

    if (!this.quote) {
      return null;
    }

    if (this?.quote?.maker) {
      maker = new UserMapper(this.quote.maker).toDomain();
    }

    return new Quote({
      id: this.quote.id,
      createdAt: this.quote.createdAt,
      updatedAt: this.quote.updatedAt,
      isDeletedAt: this.quote.isDeletedAt,
      price: this.quote.price,
      content: this.quote.content,
      plan: this.quote.plan,
      planId: this.quote.planId,
      maker,
      makerId: this.quote.makerId,
      isConfirmed: this.quote.isConfirmed,
      isAssigned: this.quote.isAssigned
    });
  }
}
