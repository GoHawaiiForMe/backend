import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import UserStatsModule from '../userStats/userStats.module';
import AuthRepository from './auth.repository';
import AuthService from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
    UserStatsModule
  ],
  controllers: [],
  providers: [AuthService, AuthRepository, JwtStrategy],
  exports: []
})
export default class AuthModule {}
