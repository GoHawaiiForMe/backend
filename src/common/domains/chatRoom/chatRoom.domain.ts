import { Types } from 'mongoose';
import IChatRoom from './chatRoom.interface';
import { ChatRoomObjectProperties, ChatRoomProperties } from './chatRoom.properties';

export default class ChatRoom implements IChatRoom {
  private id?: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private userIds: string[];
  private planId: string;
  private chatIds: string[];
  private lastChat: string;
  private isActive?: boolean;

  constructor(private chatRoom: ChatRoomProperties) {
    this.id = chatRoom.id;
    this.createdAt = chatRoom.createdAt;
    this.updatedAt = chatRoom.updatedAt;
    this.planId = chatRoom.planId;
    this.userIds = chatRoom.userIds;
    this.lastChat = chatRoom.lastChat;
    this.isActive = chatRoom.isActive;
  }

  static create(data: { planId: string; userIds: string[] }) {
    return new ChatRoom(data);
  }

  toDB(): ChatRoomObjectProperties {
    return {
      id: new Types.ObjectId(this.id),
      userIds: this.userIds,
      chatIds: this.chatIds?.map((chatId) => new Types.ObjectId(chatId)),
      planId: this.planId
    };
  }

  toClient(): ChatRoomProperties {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userIds: this.userIds,
      planId: this.planId,
      lastChat: this.lastChat,
      isActive: this.isActive
    };
  }
  toClientSingle(): ChatRoomProperties {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userIds: this.userIds,
      planId: this.planId,
      isActive: this.isActive
    };
  }

  getUserIds(): string[] {
    return this.userIds;
  }

  getIsActive(): boolean {
    return this.isActive;
  }
}
