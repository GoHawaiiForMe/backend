import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UserId } from 'src/common/decorators/user.decorator';
import { ChatRoomWithUserInfo } from 'src/common/domains/chatRoom/chatRoom.properties';
import ChatRoomService from './chatRoom.service';
import { ChatProperties } from 'src/common/domains/chat/chat.properties';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatType, MB } from 'src/common/constants/chat.type';
import { FileValidationPipe } from 'src/common/pipes/fileValidation.pipe';
import { ChatRoomIdDTO, ChatRoomQueryDTO } from 'src/common/types/chatRoom/chatRoom.dto';

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
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
  async getChatRoomById(@UserId() userId: string, @Param() params: ChatRoomIdDTO): Promise<ChatRoomWithUserInfo> {
    const { chatRoomId } = params;
    const chatRoom = await this.chatRoomService.getChatRoomById({ userId, chatRoomId });
    return chatRoom;
  }

  @Get(':chatRoomId/chats')
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
  async getChatsByChatRoomId(
    @UserId() userId: string,
    @Param() params: ChatRoomIdDTO,
    @Query() options: ChatRoomQueryDTO
  ): Promise<{ totalCount: number; list: ChatProperties[] }> {
    const { chatRoomId } = params;
    const { totalCount, list } = await this.chatRoomService.getChatsByChatRoomId({ userId, chatRoomId, ...options });
    return { totalCount, list };
  }

  @Post(':chatRoomId/chats')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileValidationPipe, new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
  async filesUpload(
    @UserId() userId: string,
    @Param() params: ChatRoomIdDTO,
    @UploadedFile() file: Express.Multer.File,
    @Body('type') type: ChatType
  ) {
    const { chatRoomId } = params;
    const response = await this.chatRoomService.fileUpload({ senderId: userId, chatRoomId, file, type });
    return response;
  }
}
