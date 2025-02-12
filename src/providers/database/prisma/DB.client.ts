import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProfileImageValues } from 'src/common/constants/image.type';
import { RoleValues } from 'src/common/constants/role.type';
import { ServiceAreaValues } from 'src/common/constants/serviceArea.type';
import { StatusValues } from 'src/common/constants/status.type';
import { TripTypeValues } from 'src/common/constants/tripType.type';
import { USERS } from './mock/user.mock';
import { HashingPassword } from 'src/common/utilities/hashingPassword';
import { MAKER_PROFILES } from './mock/makerProfile.mock';
import { DREAMER_PROFILES } from './mock/dreamerProfile.mock';
import { PLANS } from './mock/plan.mock';

@Injectable()
class DBClient extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async seedForTestEnvironment() {
    const users = await Promise.all(
      USERS.map(async (user) => ({
        ...user,
        password: await HashingPassword(user.password)
      }))
    );

    const plans = PLANS.map((plan) => {
      const { assignees, ...restPlan } = plan;
      return restPlan;
    });

    try {
      console.log('Seeding database...');
      await this.review.deleteMany();
      await this.quote.deleteMany();
      await this.plan.deleteMany();
      await this.follow.deleteMany();
      await this.makerProfile.deleteMany();
      await this.dreamerProfile.deleteMany();
      await this.userStats.deleteMany();
      await this.user.deleteMany();

      await this.user.createMany({
        data: users,
        skipDuplicates: true
      });

      await this.makerProfile.createMany({
        data: MAKER_PROFILES,
        skipDuplicates: true
      });

      await this.dreamerProfile.createMany({
        data: DREAMER_PROFILES,
        skipDuplicates: true
      });

      await this.plan.createMany({
        data: plans,
        skipDuplicates: true
      });

      console.log('TestDatabase seeding complete!');
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  }
}
export default DBClient;
