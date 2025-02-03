import { forwardRef, Module } from '@nestjs/common';
import ChatService from './chat.service';
import WebSocketJwtGuard from 'src/common/guards/webSocket.guard';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import ChatRoomSchema, { ChatRoom } from 'src/providers/database/mongoose/chatRoom.schema';
import ChatSchema, { Chat } from 'src/providers/database/mongoose/chat.schema';
import ChatRepository from './chat.repository';
import ChatGateway from './chat.gateway';
import ChatRoomModule from '../chatRoom/chatRoom.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
    MongooseModule.forFeature([
      { name: ChatRoom.name, schema: ChatRoomSchema },
      { name: Chat.name, schema: ChatSchema }
    ]),
    forwardRef(() => ChatRoomModule)
  ],
  controllers: [],
  providers: [ChatService, ChatRepository, WebSocketJwtGuard, ChatGateway],
  exports: [ChatService]
})
export default class ChatModule {}
