import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import PrismaModule from 'prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import getMongoConfig from '../config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async () => getMongoConfig(process.env.MONGO_URI),
      connectionName: process.env.CONNECTION_NAME
    }),
    PrismaModule
  ],
  controllers: [],
  providers: []
})
export default class AppModule {}
