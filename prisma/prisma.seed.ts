import { NestFactory } from '@nestjs/core';
import AppModule from '../src/app.module';
import PrismaDBClient from './DB.client';

async function main(prisma: PrismaDBClient) {
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
