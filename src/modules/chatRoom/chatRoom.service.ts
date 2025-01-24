import { Injectable } from '@nestjs/common';
import { ChatCreateData, ChatQueryOptions } from 'src/common/types/chat/chat.type';
import ChatRoomRepository from './chatRoom.repository';
import { ChatRoomProperties } from 'src/common/domains/chatRoom/chatRoom.properties';
import PlanService from '../plan/plan.service';
import ForbiddenError from 'src/common/errors/forbiddenError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import ChatRoom from 'src/common/domains/chatRoom/chatRoom.domain';
import ConflictError from 'src/common/errors/conflictError';
import ChatService from '../chat/chat.service';
import BadRequestError from 'src/common/errors/badRequestError';
import { ChatProperties } from 'src/common/domains/chat/chat.properties';

@Injectable()
export default class ChatRoomService {
  constructor(
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly chatService: ChatService,
    private readonly planService: PlanService
  ) {}

  async getChatRooms(options: ChatQueryOptions): Promise<{ totalCount: number; list: ChatRoomProperties[] }> {
    const totalCount = await this.chatRoomRepository.totalCount(options.userId);
    const list = await this.chatRoomRepository.findManyChatRooms(options);
    const toClientList = list?.map((chatRoom) => chatRoom.toClient());
    return { list: toClientList, totalCount };
  } //TODO. 유저 정보 더해서 주기

  async getChatRoomById(userId: string, chatRoomId: string): Promise<ChatRoomProperties> {
    //TODO. 유저 정보 더해서 주기, 플랜 정보 더해서 주기
    const chatRoom = await this.chatRoomRepository.findChatRoomById(chatRoomId);

    if (!chatRoom) {
      throw new BadRequestError(ErrorMessage.CHAT_ROOM_NOTFOUND);
    }

    if (!chatRoom.getUserIds().includes(userId)) {
      throw new ForbiddenError(ErrorMessage.CHAT_ROOM_FORBIDDEN_ID);
    }

    return chatRoom.toClient();
  }

  async postChatRoom(userIds: string[]): Promise<ChatRoomProperties> {
    const chatRoomData = ChatRoom.create({ userIds, planId: 'b198135d-9865-445b-a04b-742ca9939ee1' });

    const chatRoom = await this.chatRoomRepository.createChatRoom(chatRoomData);
    return chatRoom.toClient();
  } //NOTE. 테스트용

  async postChat(data: ChatCreateData): Promise<ChatProperties> {
    const { senderId, chatRoomId } = data;
    const chatRoom = await this.chatRoomRepository.findChatRoomById(chatRoomId);
    if (!chatRoom) {
      throw new BadRequestError(ErrorMessage.CHAT_ROOM_NOTFOUND);
    }
    const userIds = chatRoom.getUserIds();

    if (!userIds.includes(senderId)) {
      throw new ForbiddenError(ErrorMessage.CHAT_ROOM_FORBIDDEN_ID);
    }

    if (!chatRoom.getIsActive()) {
      throw new BadRequestError(ErrorMessage.CHAT_ROOM_NOT_IS_ACTIVE);
    }

    const chat = await this.chatService.postChat(data);
    return chat;
  }
}
