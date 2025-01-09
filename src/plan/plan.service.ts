import { Injectable } from '@nestjs/common';
import { Plan, Role, ServiceArea, Status } from '@prisma/client';
import PlanRepository from './plan.repository';
import PlanQueryOptions from './type/planQueryOptions';
import UserRepository from 'src/user/user.repository';
import { IDreamerProfile, IMakerProfile } from 'src/user/domain/profile.interface';
import { IUser } from 'src/user/domain/user.interface';
import ForbiddenError from 'src/common/errors/forbiddenError';
import ErrorMessage from 'src/common/enums/error.message';
import NotFoundError from 'src/common/errors/notFoundError';
import CreatePlanData from './type/createPlanData.interface';
import UpdatePlanData from './type/updatePlanData.interface';
import BadRequestError from 'src/common/errors/badRequestError';

@Injectable()
export default class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly userRepository: UserRepository
  ) {}

  async getPlans(makerId: string, options: PlanQueryOptions): Promise<{ list: Plan[]; totalCount: number }> {
    const requestUser: IUser = await this.userRepository.findById(makerId);
    const requestUserRole = requestUser.get().role;
    if (requestUserRole !== Role.MAKER) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_MAKER);
    }
    const makerProfile: IMakerProfile = await this.userRepository.findMakerProfile(makerId);
    const serviceArea: ServiceArea[] = makerProfile.get().serviceArea;
    options.serviceArea = serviceArea;

    const [totalCount, list] = await Promise.all([
      this.planRepository.totalCount(options),
      this.planRepository.findMany(options)
    ]);

    return { list, totalCount };
  }

  async getPlanById(id: string): Promise<Plan> {
    const plan = await this.planRepository.findById(id);
    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }
    return plan; //TODO. 단일조회시에도 권한이 필요한지 알아봐야됨
  }

  async postPlan(data: CreatePlanData): Promise<Plan> {
    const dreamer = await this.userRepository.findById(data.dreamerId);
    if (dreamer.get().role !== Role.DREAMER) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_DREAMER);
    }

    const plan = await this.planRepository.create(data);
    return plan;
  }
  async updatePlanAssign(id: string, requestUserId: string, data: Partial<UpdatePlanData>): Promise<Plan> {
    const isPlan = await this.planRepository.findById(id);

    if (!isPlan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }

    if (isPlan.dreamerId !== requestUserId) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_OWNER);
    }

    if (isPlan.status !== Status.PENDING) {
      throw new BadRequestError(ErrorMessage.PLAN_STATUS_INVALID);
    }

    const plan = await this.planRepository.update(id, data);
    return plan;
  }
  async updatePlanComplete(id: string, requestUserId: string): Promise<Plan> {
    const isPlan = await this.planRepository.findById(id);

    if (!isPlan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }

    if (isPlan.dreamerId !== requestUserId) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_OWNER);
    }
    const data = { status: Status.COMPLETED };
    const plan = await this.planRepository.update(id, data);
    return plan;
  }

  async deletePlan(id: string, requestUserId: string): Promise<Plan> {
    const plan = await this.planRepository.findById(id);
    if (!plan) {
      throw new NotFoundError(ErrorMessage.PLAN_NOT_FOUND);
    }
    if (plan.dreamerId !== requestUserId) {
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_OWNER);
    }
    const deletedPlan = this.planRepository.delete(id);
    return deletedPlan;
  }
}
