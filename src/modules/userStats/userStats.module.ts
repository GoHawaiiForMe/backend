import { Module } from '@nestjs/common';
import UserStatsController from './userStats.controller';
import UserRepository from '../user/user.repository';
import UserStatsService from './userStats.service';

@Module({
  imports: [],
  controllers: [UserStatsController],
  providers: [UserRepository, UserStatsService],
  exports: []
})
export default class UserStatsModule {}
