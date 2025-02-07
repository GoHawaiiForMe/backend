import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import ChatService from './chat.service';
import { UserId } from 'src/common/decorators/user.decorator';

@Controller('chats')
export default class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteChat(@UserId() userId: string, @Param('id') id: string): Promise<void> {
    await this.chatService.deleteChat({ userId, id });
  }
}
