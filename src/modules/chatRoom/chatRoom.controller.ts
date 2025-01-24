import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserId } from 'src/common/decorators/user.decorator';
import { ChatRoomProperties } from 'src/common/domains/chatRoom/chatRoom.properties';
import { ChatRoomQueryDTO } from 'src/common/types/chat/chat.dto';
import ChatRoomService from './chatRoom.service';
import { Types } from 'mongoose';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { ChatProperties } from 'src/common/domains/chat/chat.properties';

@Controller('chatRooms')
export default class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Get()
  async getChatRooms(
    @UserId() userId: string,
    @Query() options: ChatRoomQueryDTO
  ): Promise<{ totalCount: number; list: ChatRoomProperties[] }> {
    const { totalCount, list } = await this.chatRoomService.getChatRooms({ userId, ...options });
    return { totalCount, list };
  }
  @Get(':chatRoomId')
  async getChatRoomById(
    @UserId() userId: string,
    @Param('chatRoomId') chatRoomId: string
  ): Promise<ChatRoomProperties> {
    const chatRoom = await this.chatRoomService.getChatRoomById(userId, chatRoomId);
    return chatRoom;
  }

  @Post() //TO_DELETE. 테스트용
  async postChatRoom(@UserId() userId: string, @Body() data: { otherUserId: string }): Promise<ChatRoomProperties> {
    const userIds = [userId, data.otherUserId];
    const chatRoom = await this.chatRoomService.postChatRoom(userIds);
    return chatRoom;
  }

  @Post(':chatRoomId/chats') //TO_DELETE 테스트용
  async postChat(
    @UserId() userId: string,
    @Param('chatRoomId') chatRoomId: string,
    @Body('content') content: string
  ): Promise<ChatProperties> {
    if (!Types.ObjectId.isValid(chatRoomId)) {
      throw new BadRequestError(ErrorMessage.CHAT_POST_BAD_ID);
    }

    const chat = await this.chatRoomService.postChat({ senderId: userId, chatRoomId, content });
    return chat;
  }
}
