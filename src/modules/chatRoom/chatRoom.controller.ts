import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { UserId } from 'src/common/decorators/user.decorator';
import { ChatRoomWithUserInfo } from 'src/common/domains/chatRoom/chatRoom.properties';
import { ChatRoomQueryDTO } from 'src/common/types/chat/chat.dto';
import ChatRoomService from './chatRoom.service';
import { ChatProperties } from 'src/common/domains/chat/chat.properties';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatType, MB } from 'src/common/constants/chat.type';
import { FileValidationPipe } from 'src/common/pipes/file-validation.pipe';

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

  @Post(':chatRoomId/chats')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileValidationPipe)
  async filesUpload(
    @UserId() userId: string,
    @Param('chatRoomId') chatRoomId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body('type') type: ChatType
  ) {
    const response = await this.chatRoomService.fileUpload({ senderId: userId, chatRoomId, file, type });
    return response;
  }
}
