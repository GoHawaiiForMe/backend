import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import PrismaModule from 'prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import getMongoConfig from '../config/mongo.config';
import UserModule from './core/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './shared/guard/user.guard';
import { EventEmitterModule } from '@nestjs/event-emitter';
import NotificationModule from './core/notification/notification.module';
import FollowModule from './core/follow/follow.module';
import PlanModule from './core/plan/plan.module';
import QuoteModule from './core/quote/quote.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => getMongoConfig(process.env.MONGO_URI),
      connectionName: process.env.CONNECTION_NAME
    }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    UserModule,
    NotificationModule,
    FollowModule,
    PlanModule,
    QuoteModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserGuard
    }
  ]
})
export default class AppModule {}
