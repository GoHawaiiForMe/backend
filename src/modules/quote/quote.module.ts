import { Module } from '@nestjs/common';
import QuoteController from './quote.controller';
import QuoteService from './quote.service';
import QuoteRepository from './quote.repository';
import UserModule from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [QuoteController],
  providers: [QuoteService, QuoteRepository],
  exports: [QuoteService, QuoteRepository]
})
export default class QuoteModule {}
