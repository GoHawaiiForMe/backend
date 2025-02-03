import { forwardRef, Inject, Injectable } from '@nestjs/common';
import ChatRepository from './chat.repository';
import { ChatCreateData, ChatQueryOptions } from 'src/common/types/chat/chat.type';
import IChat from 'src/common/domains/chat/chat.interface';
import Chat from 'src/common/domains/chat/chat.domain';
import { ChatProperties, ChatToClientProperties } from 'src/common/domains/chat/chat.properties';
import ChatRoomService from '../chatRoom/chatRoom.service';
import ForbiddenError from 'src/common/errors/forbiddenError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';

@Injectable()
export default class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    @Inject(forwardRef(() => ChatRoomService))
    private readonly chatRoomService: ChatRoomService
  ) {}

  async getChatsByChatRoomId(options: ChatQueryOptions): Promise<{ totalCount: number; list: ChatProperties[] }> {
    const [totalCount, list] = await Promise.all([
      this.chatRepository.totalCount(options.chatRoomId),
      this.chatRepository.findChatsByChatRoomId(options)
    ]);

    const toClientList = list?.map((chat) => chat.toClient());
    return { totalCount, list: toClientList };
  }

  async postChat(data: ChatCreateData): Promise<void> {
    const { senderId, chatRoomId } = data;
    const chatData = Chat.create(data);
    const client = this.chatRoomService.isClient(data.senderId);
    if (!client) throw new ForbiddenError(ErrorMessage.CLIENT_NOT_CONNECTED);
    await this.chatRoomService.getChatRoomById({ userId: senderId, chatRoomId });
    const chat = await this.chatRepository.createChat(chatData);
    await this.chatRoomService.sendMessageToChatRoom(chat.toClient());
  }
}
