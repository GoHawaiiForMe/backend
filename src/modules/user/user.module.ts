import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';
import UserStatsModule from '../userStats/userStats.module';
import FollowModule from '../follow/follow.module';

@Module({
  imports: [UserStatsModule, FollowModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export default class UserModule {}
