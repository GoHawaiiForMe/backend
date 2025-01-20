import { Module } from '@nestjs/common';
import UserStatsController from './userStats.controller';
import UserStatsService from './userStats.service';
import UserStatsSchema, { UserStats } from 'src/providers/database/mongoose/userStats.schema';
import { MongooseModule } from '@nestjs/mongoose';
import UserStatsRepository from './userStats.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserStats.name, schema: UserStatsSchema }])],
  controllers: [UserStatsController],
  providers: [UserStatsRepository, UserStatsService],
  exports: []
})
export default class UserStatsModule {}
