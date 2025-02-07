import { forwardRef, Module } from '@nestjs/common';
import ChatService from './chat.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import ChatRoomSchema, { ChatRoom } from 'src/providers/database/mongoose/chatRoom.schema';
import ChatSchema, { Chat } from 'src/providers/database/mongoose/chat.schema';
import ChatRepository from './chat.repository';
import S3Module from 'src/providers/storage/s3/s3.module';
import ChatController from './chat.controller';
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
    S3Module,
    forwardRef(() => ChatRoomModule)
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository],
  exports: [ChatService]
})
export default class ChatModule {}
