import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import ChatService from './chat.service';

@Controller('chats')
export default class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteChat(@Param('id') id: string): Promise<void> {
    await this.chatService.deleteChat(id);
  }
}
