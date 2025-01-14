import { Global, Module } from '@nestjs/common';
import PrismaDBClient from './DB.client';

@Global()
@Module({
  providers: [PrismaDBClient],
  exports: [PrismaDBClient]
})
export default class PrismaModule {}
