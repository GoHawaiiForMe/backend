import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import PrismaModule from 'prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import getMongoConfig from '../config/mongo.config';
import UserModule from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guard/login.guard';
import { EventEmitterModule } from '@nestjs/event-emitter';
import NotificationModule from './notification/notification.module';
import ChatSchema from 'mongoose/chat.schema';
import NotificationSchema, { Notification } from 'mongoose/notification.schema';

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
    NotificationModule
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
