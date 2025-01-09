import { NestFactory } from '@nestjs/core';
import AppModule from '../src/app.module';
import PrismaDBClient from './DB.client';
import { USERS } from './mock/user.mock';
import { PLANS } from './mock/plan.mock';
import { DREAMER_PROFILES } from './mock/dreamerProfile.mock';
import { MAKER_PROFILES } from './mock/makerProfile.mock';
import { FOLLOWS } from './mock/follow.mock';
import { HashingPassword } from 'src/common/utility/hashingPassword';

async function main(prisma: PrismaDBClient) {
  // 유저 비밀번호 해시 후 데이터베이스 시딩
  const users = await Promise.all(
    USERS.map(async (user) => ({
      ...user,
      password: await HashingPassword(user.password)
    }))
  );

  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.dreamerProfile.deleteMany(),
    prisma.makerProfile.deleteMany(),
    prisma.follow.deleteMany(),
    prisma.plan.deleteMany(),

    prisma.user.createMany({
      data: users,
      skipDuplicates: true
    }),
    prisma.dreamerProfile.createMany({
      data: DREAMER_PROFILES,
      skipDuplicates: true
    }),
    prisma.makerProfile.createMany({
      data: MAKER_PROFILES,
      skipDuplicates: true
    }),
    prisma.follow.createMany({
      data: FOLLOWS,
      skipDuplicates: true
    }),
    prisma.plan.createMany({
      data: PLANS,
      skipDuplicates: true
    })
  ]);
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
