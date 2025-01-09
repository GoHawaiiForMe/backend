import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import PrismaModule from 'prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import getMongoConfig from '../config/mongo.config';
import UserModule from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guard/login.guard';
import FollowModule from './follow/follow.module';
import PlanModule from './plan/plan.module';
import QuoteModule from './quote/quote.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => getMongoConfig(process.env.MONGO_URI),
      connectionName: process.env.CONNECTION_NAME
    }),
    PrismaModule,
    UserModule,
    FollowModule,
    PlanModule,
    QuoteModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard
    }
  ]
})
export default class AppModule {}
