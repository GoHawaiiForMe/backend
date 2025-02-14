import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { USERS } from './mock/test.mock';
import { HashingPassword } from 'src/common/utilities/hashingPassword';
import { MAKER_PROFILES } from './mock/test.mock';
import { DREAMER_PROFILES } from './mock/test.mock';
import { PLANS } from './mock/test.mock';

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

      for (const PLAN of PLANS) {
        await this.plan.create({
          data: {
            ...PLAN,
            assignees: {
              connect: PLAN.assignees?.map((assignee) => ({ id: assignee.id }))
            }
          }
        });
      }

      console.log('TestDatabase seeding complete!');
    } catch (error) {
      console.error('Error during seeding:', error);
    }
  }
}
export default DBClient;
