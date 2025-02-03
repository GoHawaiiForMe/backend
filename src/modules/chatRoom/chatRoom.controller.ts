import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserId } from 'src/common/decorators/user.decorator';
import { ChatRoomWithUserInfo } from 'src/common/domains/chatRoom/chatRoom.properties';
import { ChatRoomQueryDTO } from 'src/common/types/chat/chat.dto';
import ChatRoomService from './chatRoom.service';
import { Types } from 'mongoose';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { ChatProperties } from 'src/common/domains/chat/chat.properties';
import IChatRoom from 'src/common/domains/chatRoom/chatRoom.interface';

@Controller('chatRooms')
export default class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Get()
  async getChatRooms(
    @UserId() userId: string,
    @Query() options: ChatRoomQueryDTO
  ): Promise<{ totalCount: number; list: ChatRoomWithUserInfo[] }> {
    const { totalCount, list } = await this.chatRoomService.getChatRooms({ userId, ...options });
    return { totalCount, list };
  }

  @Get(':chatRoomId')
  async getChatRoomById(
    @UserId() userId: string,
    @Param('chatRoomId') chatRoomId: string
  ): Promise<ChatRoomWithUserInfo> {
    const chatRoom = await this.chatRoomService.getChatRoomById({ userId, chatRoomId });
    return chatRoom;
  }

  @Get(':chatRoomId/chats')
  async getChatsByChatRoomId(
    @UserId() userId: string,
    @Param('chatRoomId') chatRoomId: string,
    @Query() options: ChatRoomQueryDTO
  ): Promise<{ totalCount: number; list: ChatProperties[] }> {
    const { totalCount, list } = await this.chatRoomService.getChatsByChatRoomId({ userId, chatRoomId, ...options });
    return { totalCount, list };
  }
}
