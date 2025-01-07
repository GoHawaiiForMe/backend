import { Injectable } from '@nestjs/common';
import { Plan, Role, ServiceArea } from '@prisma/client';
import PlanRepository from './plan.repository';
import PlanQueryOptions from './type/planQueryOptions';
import UserRepository from 'src/user/user.repository';
import { IDreamerProfile, IMakerProfile } from 'src/user/domain/profile.interface';
import { IUser } from 'src/user/domain/user.interface';
import ForbiddenError from 'src/common/errors/forbiddenError';
import ErrorMessage from 'src/common/enums/error.message';

@Injectable()
export default class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly userRepository: UserRepository
  ) {}

  async getPlans(options: PlanQueryOptions): Promise<{ list: Plan[]; totalCount: number }> {
    const requestUser: IUser = await this.userRepository.findById(options.makerId);
    const requestUserRole = requestUser.get().role;
    if (requestUserRole !== Role.MAKER) {
      console.log('여기서에러');
      throw new ForbiddenError(ErrorMessage.USER_FORBIDDEN_NOT_MAKER);
    }
    const makerProfile: IMakerProfile = await this.userRepository.findMakerProfile(options.makerId);
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
    return plan; //TODO. 단일조회시에도 권한이 필요한지 알아봐야됨
  }
}
