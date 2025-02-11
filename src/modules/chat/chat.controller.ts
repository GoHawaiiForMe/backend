import { Controller, Delete, HttpCode, HttpStatus, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import ChatService from './chat.service';
import { UserId } from 'src/common/decorators/user.decorator';
import { ChatIdDTO } from 'src/common/types/chat/chat.dto';

@Controller('chats')
export default class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteChat(@UserId() userId: string, @Param() params: ChatIdDTO): Promise<void> {
    const { id } = params;
    await this.chatService.deleteChat({ userId, id });
  }
}
