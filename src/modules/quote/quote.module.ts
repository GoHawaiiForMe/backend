import { Module } from '@nestjs/common';
import QuoteController from './quote.controller';
import QuoteService from './quote.service';
import QuoteRepository from './quote.repository';
import UserModule from '../user/user.module';
import ChatRoomModule from '../chatRoom/chatRoom.module';

@Module({
  imports: [UserModule, ChatRoomModule],
  controllers: [QuoteController],
  providers: [QuoteService, QuoteRepository],
  exports: [QuoteService]
})
export default class QuoteModule {}
