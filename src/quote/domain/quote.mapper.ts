import NotFoundError from 'src/common/errors/notFoundError';
import Quote from './quote.domain';
import QuoteMapperProperties from '../type/quote.mapper.properties.interface';
import { IUser } from 'src/user/domain/user.interface';
import UserMapper from 'src/user/domain/user.mapper';
import ErrorMessage from 'src/common/enums/error.message';

export default class QuoteMapper {
  constructor(private readonly quote: QuoteMapperProperties) {}

  toDomain(): Quote {
    let maker: IUser | null = null;
    if (this?.quote?.maker) {
      maker = new UserMapper(this.quote.maker).toDomain();
    }
    if (!this.quote) {
      return null;
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
