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
    let dreamer: IUser | null = null;
    let assignees: IUser[] = [];
    let quotes: IQuote[] = [];

    if (!this.plan) return null;
    if (this?.plan?.dreamer) {
      dreamer = new UserMapper(this.plan.dreamer).toDomain();
    }

    if (this.plan.assignees && this.plan.assignees.length > 0) {
      assignees = this.plan.assignees.map((assignee) => new UserMapper(assignee).toDomain());
    }

    if (this.plan.quotes && this.plan.quotes.length > 0) {
      quotes = this.plan.quotes.map((quote) => new QuoteMapper(quote).toDomain());
    }

    return new Plan({
      id: this.plan.id,
      createdAt: this.plan.createdAt,
      updatedAt: this.plan.updatedAt,
      isDeletedAt: this.plan.isDeletedAt,
      title: this.plan.title,
      startDate: this.plan.startDate,
      endDate: this.plan.endDate,
      tripType: this.plan.tripType,
      serviceArea: this.plan.serviceArea,
      details: this.plan.details,
      address: this.plan.address,
      status: this.plan.status ?? StatusEnum.PENDING,
      quotes,
      assignees,
      dreamer,
      dreamerId: this.plan.dreamerId,
      review: this.plan.review
    });
  }
}
