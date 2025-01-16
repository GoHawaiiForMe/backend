import { PlanMapperProperties } from 'src/common/types/plan/plan.properties';
import IPlan from './plan.interface';
import { IUser } from '../user/user.interface';
import IQuote from '../quote/quote.interface';
import UserMapper from '../user/user.mapper';
import QuoteMapper from '../quote/quote.mapper';
import Plan from './plan.domain';
import { StatusEnum } from 'src/common/constants/status.type';

export default class PlanMapper {
  constructor(private readonly plan: PlanMapperProperties) {}
  toDomain(): IPlan {
    if (!this.plan) return null;

    return new Plan({
      id: this.plan.id,
      createdAt: this.plan.createdAt,
      updatedAt: this.plan.updatedAt,
      isDeletedAt: this.plan.isDeletedAt,
      title: this.plan.title,
      startDate: this.plan.startDate,
      tripType: this.plan.tripType,
      serviceArea: this.plan.serviceArea,
      details: this.plan.details,
      address: this.plan.address,
      status: this.plan.status ?? StatusEnum.PENDING,
      quotes: this.plan.quotes?.map((quote) => new QuoteMapper(quote)?.toDomain()),
      assignees: this.plan.assignees?.map((assignee) => new UserMapper(assignee)?.toDomain()),
      dreamer: new UserMapper(this.plan.dreamer)?.toDomain(),
      dreamerId: this.plan.dreamerId,
      review: this.plan.review
    });
  }
}
