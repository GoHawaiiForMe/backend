import { Injectable } from '@nestjs/common';
import { Plan } from '@prisma/client';
import DBClient from 'prisma/DB.client';

@Injectable()
export default class PlanRepository {
  constructor(private readonly db: DBClient) {}
  async finById(id: string): Promise<Plan> {
    const plan = await this.db.plan.findUnique({
      where: { id, isDeletedAt: null },
      include: {
        dreamer: { select: { id: true, nickName: true, role: true } },
        assignees: { select: { id: true, nickName: true, role: true } }
      }
    });
    return plan;
  }
}
