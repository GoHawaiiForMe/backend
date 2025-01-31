import IChatRoom from './chatRoom.interface';
import { ChatRoomProperties } from './chatRoom.properties';

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

  toDB(): ChatRoomProperties {
    return {
      id: this.id,
      userIds: this.userIds,
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

  getId(): string {
    return this.id;
  }

  getUserIds(): string[] {
    return this.userIds;
  }

  getIsActive(): boolean {
    return this.isActive;
  }
}
