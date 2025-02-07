import { HttpStatus, Injectable } from '@nestjs/common';
import { ChatCreateData, ChatQueryOptions } from 'src/common/types/chat/chat.type';
import ChatRoomRepository from './chatRoom.repository';
import { ChatRoomProperties, ChatRoomWithUserInfo } from 'src/common/domains/chatRoom/chatRoom.properties';
import ForbiddenError from 'src/common/errors/forbiddenError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import ChatRoom from 'src/common/domains/chatRoom/chatRoom.domain';
import ChatService from '../chat/chat.service';
import { ChatProperties, ChatToClientProperties } from 'src/common/domains/chat/chat.properties';
import UserService from '../user/user.service';
import { Socket } from 'socket.io';
import { ChatReference, FileUploadData, FindChatRoomByIdOptions } from 'src/common/types/chatRoom/chatRoom.type';
import NotFoundError from 'src/common/errors/notFoundError';
import IChatRoom from 'src/common/domains/chatRoom/chatRoom.interface';
import BadRequestError from 'src/common/errors/badRequestError';

@Injectable()
export default class ChatRoomService {
  private readonly connectedClients = new Map<string, Socket>();
  constructor(
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly chatService: ChatService,
    private readonly userService: UserService
  ) {}

  registerClient(userId: string, client: Socket) {
    this.connectedClients.set(userId, client);
  }

  removeClient(userId: string) {
    this.connectedClients.delete(userId);
  }

  isClient(userId: string): boolean {
    const client = this.connectedClients.get(userId);
    if (!client) throw new ForbiddenError(ErrorMessage.CLIENT_NOT_CONNECTED);
    return !!client;
  }

  async joinUserRooms(userId: string, client: Socket) {
    const userChatRoomIds = await this.getActiveChatRoomIds(userId);
    userChatRoomIds.forEach((chatRoomId) => client.join(chatRoomId));
  }

  async getChatRooms(options: ChatQueryOptions): Promise<{ totalCount: number; list: ChatRoomWithUserInfo[] }> {
    const totalCount = await this.chatRoomRepository.totalCount(options.userId);
    const list = await this.chatRoomRepository.findManyChatRooms(options);
    const toClientList = await Promise.all(list?.map((chatRoom) => this.fetchAndFormatUserInfo(chatRoom.toClient())));

    return { list: toClientList, totalCount };
  }

  async getActiveChatRoomIds(userId: string): Promise<string[]> {
    const chatRoomIds = await this.chatRoomRepository.findActiveChatRoomIdByUserId(userId);
    return chatRoomIds;
  }

  async getChatRoomDomain(options: FindChatRoomByIdOptions): Promise<IChatRoom> {
    const { userId, chatRoomId } = options;
    const chatRoom = await this.chatRoomRepository.findChatRoom({ chatRoomId: chatRoomId });

    if (!chatRoom) {
      throw new NotFoundError(ErrorMessage.CHAT_ROOM_NOTFOUND);
    }

    if (userId && !chatRoom.getUserIds().includes(userId)) {
      throw new ForbiddenError(ErrorMessage.CHAT_ROOM_FORBIDDEN_ID);
    }

    return chatRoom;
  }

  async getChatRoomById(options: FindChatRoomByIdOptions): Promise<ChatRoomWithUserInfo> {
    const chatRoom = await this.getChatRoomDomain(options);
    const chatRoomWithUserInfo = await this.fetchAndFormatUserInfo(chatRoom.toClient());

    return chatRoomWithUserInfo;
  }

  async getChatsByChatRoomId(options: ChatQueryOptions): Promise<{ totalCount: number; list: ChatProperties[] }> {
    const { userId, chatRoomId } = options;

    await this.getChatRoomById({ userId, chatRoomId });
    const { totalCount, list } = await this.chatService.getChatsByChatRoomId(options);
    return { totalCount, list };
  }

  async postChatRoom(data: ChatRoomProperties): Promise<ChatRoomProperties> {
    const chatRoomData = ChatRoom.create(data);

    const chatRoom = await this.chatRoomRepository.createChatRoom(chatRoomData);
    return chatRoom.toClient();
  }

  async postChat(data: ChatCreateData): Promise<ChatToClientProperties> {
    const { senderId, chatRoomId } = data;

    this.isClient(senderId);
    const chatRoom = await this.getChatRoomDomain({ userId: senderId, chatRoomId });
    if (chatRoom.getIsActive() === false) throw new BadRequestError(ErrorMessage.CHAT_ROOM_NOT_IS_ACTIVE);

    const chatData = await this.chatService.postChat(data);
    await this.sendMessageToChatRoom(chatData);

    return chatData;
  }

  async fileUpload(data: FileUploadData) {
    const { chatRoomId, senderId } = data;
    const chatRoom = await this.getChatRoomDomain({ chatRoomId, userId: senderId });

    if (chatRoom.getIsActive() === false) throw new BadRequestError(ErrorMessage.CHAT_ROOM_NOT_IS_ACTIVE);
    const chatData = await this.chatService.fileUpload(data);
    this.sendMessageToChatRoom(chatData);
    return chatData;
  }

  async deActive(data: { planId?: string; planIds?: string[] }): Promise<void> {
    const { planId, planIds } = data || {};
    if (planId) {
      const chatRoom = await this.getChatRoomDomain({ planId });
      chatRoom.update();
      await this.chatRoomRepository.update(chatRoom);
    }
    if (planIds) await this.chatRoomRepository.updateMany(planIds);
  }

  async sendMessageToChatRoom(chat: ChatReference) {
    const { senderId, chatRoomId } = chat;

    const client = this.connectedClients.get(senderId);
    client?.to(chatRoomId)?.emit('ServerToClientMessage', chat);
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
