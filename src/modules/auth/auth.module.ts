import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import UserStatsModule from '../userStats/userStats.module';
import AuthRepository from './auth.repository';
import AuthService from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import AuthController from './auth.controller';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { NaverStrategy } from './strategy/naver.strategy';
import ProfileModule from '../profile/profile.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
    ProfileModule,
    UserStatsModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy, GoogleStrategy, KakaoStrategy, NaverStrategy],
  exports: []
})
export default class AuthModule {}
