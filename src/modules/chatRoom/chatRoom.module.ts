import { Module } from '@nestjs/common';
import ChatRoomController from './chatRoom.controller';
import ChatRoomRepository from './chatRoom.repository';
import ChatRoomService from './chatRoom.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import ChatRoomSchema, { ChatRoom } from 'src/providers/database/mongoose/chatRoom.schema';
import PlanModule from '../plan/plan.module';
import ChatModule from '../chat/chat.module';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
    MongooseModule.forFeature([{ name: ChatRoom.name, schema: ChatRoomSchema }]),
    PlanModule,
    ChatModule
  ],
  controllers: [ChatRoomController],
  providers: [ChatRoomRepository, ChatRoomService]
})
export default class ChatRoomModule {}
