import { Module } from '@nestjs/common';
import UserStatsController from './userStats.controller';
import UserRepository from '../user/user.repository';
import UserStatsService from './userStats.service';
import UserStatsSchema, { UserStats } from 'src/providers/database/mongoose/userStats.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: UserStats.name, schema: UserStatsSchema }])],
  controllers: [UserStatsController],
  providers: [UserRepository, UserStatsService],
  exports: []
})
export default class UserStatsModule {}
