import { Module } from '@nestjs/common';
import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import UserStatsModule from '../userStats/userStats.module';
import FollowModule from '../follow/follow.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
    UserStatsModule,
    FollowModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, JwtStrategy],
  exports: [UserService]
})
export default class UserModule {}
