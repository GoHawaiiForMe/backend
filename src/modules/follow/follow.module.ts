import { Module } from '@nestjs/common';
import PrismaModule from 'src/providers/database/prisma/prisma.module';
import FollowRepository from './follow.repository';
import FollowController from './follow.controller';
import FollowService from './follow.service';

@Module({
  imports: [PrismaModule],
  controllers: [FollowController],
  providers: [FollowService, FollowRepository],
  exports: []
})
export default class FollowModule {}
