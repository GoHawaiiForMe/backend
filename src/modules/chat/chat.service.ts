import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import ChatRepository from './chat.repository';
import { ChatCreateData, ChatQueryOptions } from 'src/common/types/chat/chat.type';
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
  async getChatsByChatRoomId(options: ChatQueryOptions): Promise<{ totalCount: number; list: ChatProperties[] }> {
    const [totalCount, list] = await Promise.all([
      this.chatRepository.totalCount(options.chatRoomId),
      this.chatRepository.findChatsByChatRoomId(options)
    ]);

    const toClientList = list?.map((chat) => chat.toClient());
    return { totalCount, list: toClientList };
  }

  async postChat(data: ChatCreateData): Promise<ChatProperties> {
    const chatData = Chat.create(data);
    const chat = await this.chatRepository.createChat(chatData);
    return chat.toClient(); //NOTE. 테스트용
  }
}
