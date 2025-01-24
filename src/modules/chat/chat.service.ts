import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import ChatRepository from './chat.repository';
import { ChatCreateData } from 'src/common/types/chat/chat.type';
import IChat from 'src/common/domains/chat/chat.interface';
import Chat from 'src/common/domains/chat/chat.domain';
import { ChatProperties } from 'src/common/domains/chat/chat.properties';

@Injectable()
export default class ChatService {
  private readonly connectedClients = new Map<string, Socket>();

  constructor(private readonly chatRepository: ChatRepository) {}

  registerClient(userId: string, client: Socket) {
    this.connectedClients.set(userId, client);
  }

  removeClient(userId: string) {
    this.connectedClients.delete(userId);
  }

  async postChat(data: ChatCreateData): Promise<ChatProperties> {
    const chatData = Chat.create(data);
    const chat = await this.chatRepository.createChat(chatData);
    return chat.toClient(); //NOTE. 테스트용
  }
}
