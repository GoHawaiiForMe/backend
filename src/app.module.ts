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
import { BullmqModule } from './providers/queue/bullmq.module';
import ChatModule from './modules/chat/chat.module';
import UserStatsModule from './modules/userStats/userStats.module';
import TaskModule from './modules/task/task.module';
import { RedisModule } from './providers/cache/redis.module';
import ReviewModule from './modules/review/review.module';
import ChatRoomModule from './modules/chatRoom/chatRoom.module';
import AuthModule from './modules/auth/auth.module';
import S3Module from './providers/storage/s3/s3.module';
import PointLogModule from './modules/pointLog/pointLog.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => getMongoConfig(),
      connectionName: process.env.CONNECTION_NAME
    }),
    EventEmitterModule.forRoot(),
    BullmqModule,
    RedisModule,
    PrismaModule,
    AuthModule,
    UserModule,
    NotificationModule,
    FollowModule,
    PlanModule,
    QuoteModule,
    PaymentModule,
    UserStatsModule,
    TaskModule,
    ChatRoomModule,
    ChatModule,
    ReviewModule,
    S3Module,
    PointLogModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserGuard
    }
  ]
})
export default class AppModule {}
