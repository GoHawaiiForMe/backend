import { PlanMapperProperties } from 'src/common/types/plan/plan.properties';
import IPlan from './plan.interface';
import Plan from './plan.domain';
import { StatusEnum } from 'src/common/constants/status.type';

export default class PlanMapper {
  constructor(private readonly plan: PlanMapperProperties) {}
  toDomain(): IPlan {
    if (!this.plan) return null;

    const returnPlan = new Plan({
      id: this.plan.id,
      createdAt: this.plan.createdAt,
      updatedAt: this.plan.updatedAt,
      isDeletedAt: this.plan.isDeletedAt,
      title: this.plan.title,
      tripDate: this.plan.tripDate,
      tripType: this.plan.tripType,
      serviceArea: this.plan.serviceArea,
      details: this.plan.details,
      address: this.plan.address,
      status: this.plan.status ?? StatusEnum.PENDING,
      quotes: this.plan.quotes?.map((quote) => ({
        ...quote,
        maker: {
          ...quote.maker,
          image: quote.maker?.makerProfile?.image,
          makerProfile: undefined
        }
      })),
      assignees: this.plan.assignees,
      dreamer: this.plan.dreamer,
      dreamerId: this.plan.dreamerId
    });
    return returnPlan;
  }
}
