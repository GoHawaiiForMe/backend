import { NestFactory } from '@nestjs/core';
import AppModule from '../src/app.module';
import PrismaDBClient from './DB.client';
import { USERS } from './mock/user.mock';
import { PLANS } from './mock/plan.mock';

async function main(prisma: PrismaDBClient) {
  await prisma.plan.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: USERS,
    skipDuplicates: true
  });

  await prisma.plan.createMany({
    data: PLANS,
    skipDuplicates: true
  });
  console.log('Seeding completed.');
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
