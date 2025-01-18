import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import PrismaModule from './providers/database/prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import getMongoConfig from './providers/database/mongoose/config/mongo.config';
import UserModule from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { UserGuard } from './common/guards/user.guard';
import { EventEmitterModule } from '@nestjs/event-emitter';
import NotificationModule from './modules/notification/notification.module';
import FollowModule from './modules/follow/follow.module';
import PlanModule from './modules/plan/plan.module';
import QuoteModule from './modules/quote/quote.module';
import PaymentModule from './modules/payment/payment.module';
import { BullModule } from '@nestjs/bullmq';
import { BullmqModule } from './providers/cache/bullmq.module';
import TaskModule from './modules/task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => getMongoConfig(process.env.MONGO_URI),
      connectionName: process.env.CONNECTION_NAME
    }),
    EventEmitterModule.forRoot(),
    BullModule.registerQueue({
      name: 'calculation'
    }),
    BullmqModule,
    PrismaModule,
    UserModule,
    NotificationModule,
    FollowModule,
    PlanModule,
    QuoteModule,
    PaymentModule,
    TaskModule
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
