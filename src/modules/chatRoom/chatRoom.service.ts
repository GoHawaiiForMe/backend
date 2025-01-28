import { Injectable } from '@nestjs/common';
import { ChatCreateData, ChatQueryOptions } from 'src/common/types/chat/chat.type';
import ChatRoomRepository from './chatRoom.repository';
import { ChatRoomProperties, ChatRoomWithUserInfo } from 'src/common/domains/chatRoom/chatRoom.properties';
import PlanService from '../plan/plan.service';
import ForbiddenError from 'src/common/errors/forbiddenError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import ChatRoom from 'src/common/domains/chatRoom/chatRoom.domain';
import ChatService from '../chat/chat.service';
import BadRequestError from 'src/common/errors/badRequestError';
import { ChatProperties } from 'src/common/domains/chat/chat.properties';
import UserService from '../user/user.service';

@Injectable()
export default class ChatRoomService {
  constructor(
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly chatService: ChatService,
    private readonly planService: PlanService,
    private readonly userService: UserService
  ) {}

  async getChatRooms(options: ChatQueryOptions): Promise<{ totalCount: number; list: ChatRoomWithUserInfo[] }> {
    const totalCount = await this.chatRoomRepository.totalCount(options.userId);
    const list = await this.chatRoomRepository.findManyChatRooms(options);
    const toClientList = await Promise.all(list?.map((chatRoom) => this.fetchAndFormatUserInfo(chatRoom.toClient())));

    return { list: toClientList, totalCount };
  } //TODO. 유저 정보 더해서 주기

  async getChatRoomById(userId: string, chatRoomId: string): Promise<ChatRoomWithUserInfo> {
    //TODO. 유저 정보 더해서 주기, 플랜 정보 더해서 주기
    const chatRoom = await this.chatRoomRepository.findChatRoomById(chatRoomId);

    if (!chatRoom) {
      throw new BadRequestError(ErrorMessage.CHAT_ROOM_NOTFOUND);
    }

    if (!chatRoom.getUserIds().includes(userId)) {
      throw new ForbiddenError(ErrorMessage.CHAT_ROOM_FORBIDDEN_ID);
    }

    const response = await this.fetchAndFormatUserInfo(chatRoom.toClient());
    return response;
  }

  async getChatsByChatRoomId(options: ChatQueryOptions): Promise<{ totalCount: number; list: ChatProperties[] }> {
    const { userId, chatRoomId } = options;

    await this.getChatRoomById(userId, chatRoomId);
    const { totalCount, list } = await this.chatService.getChatsByChatRoomId(options);
    return { totalCount, list };
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

  async fetchAndFormatUserInfo(chatRoom: ChatRoomProperties): Promise<ChatRoomWithUserInfo> {
    const { userIds, chatIds, ...restChatRoomData } = chatRoom;

    const users = await Promise.all(
      userIds?.map(async (userId) => {
        const userData = await this.userService.getUser(userId);
        const userProfile = await this.userService.getProfile(userData.role, userId);

        const user = {
          id: userId,
          nickName: userData.nickName,
          image: userProfile.image
        };
        return user;
      })
    );
    const response = { ...restChatRoomData, users };
    return response;
  }
}
