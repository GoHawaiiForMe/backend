import { NestFactory } from '@nestjs/core';
import AppModule from '../../../app.module';
import PrismaDBClient from './DB.client';
import { USERS } from './mock/user.mock';
import { PLANS } from './mock/plan.mock';
import { DREAMER_PROFILES } from './mock/dreamerProfile.mock';
import { MAKER_PROFILES } from './mock/makerProfile.mock';
import { FOLLOWS } from './mock/follow.mock';
import { HashingPassword } from 'src/common/utilities/hashingPassword';
import { QUOTES } from './mock/quote.mock';

async function main(prisma: PrismaDBClient) {
  const users = await Promise.all(
    USERS.map(async (user) => ({
      ...user,
      password: await HashingPassword(user.password)
    }))
  );

  await prisma.$transaction(async (tx) => {
    await tx.quote.deleteMany();
    await tx.plan.deleteMany();
    await tx.follow.deleteMany();
    await tx.makerProfile.deleteMany();
    await tx.dreamerProfile.deleteMany();
    await tx.user.deleteMany();

    await tx.user.createMany({
      data: users,
      skipDuplicates: true
    });
    await tx.dreamerProfile.createMany({
      data: DREAMER_PROFILES,
      skipDuplicates: true
    });
    await tx.makerProfile.createMany({
      data: MAKER_PROFILES,
      skipDuplicates: true
    });
    await tx.follow.createMany({
      data: FOLLOWS,
      skipDuplicates: true
    });

    // Plan 데이터 시딩 (assignees 연결)
    for (const PLAN of PLANS) {
      await tx.plan.create({
        data: {
          ...PLAN,
          assignees: {
            connect: PLAN.assignees?.map((assignee) => ({ id: assignee.id }))
          }
        }
      });
    }

    await tx.quote.createMany({
      data: QUOTES,
      skipDuplicates: true
    });
  });
  console.log('🌱 Seeding completed!');
}

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const prismaDBClient = appContext.get(PrismaDBClient);
  await main(prismaDBClient);
  await appContext.close();
}

bootstrap().catch((e) => {
  console.error(e);
  process.exit(1);
});
