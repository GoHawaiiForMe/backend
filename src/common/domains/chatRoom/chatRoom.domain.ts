import IChatRoom from './chatRoom.interface';
import { ChatRoomProperties } from './chatRoom.properties';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import ConflictError from 'src/common/errors/conflictError';

export default class ChatRoom implements IChatRoom {
  private id?: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private userIds: string[];
  private planId: string;
  private planTitle: string;
  private planTripDate: Date;
  private quotePrice: number;
  private chatIds: string[];
  private lastChat: string;
  private isActive?: boolean;

  constructor(private chatRoom: ChatRoomProperties) {
    this.id = chatRoom.id;
    this.createdAt = chatRoom.createdAt;
    this.updatedAt = chatRoom.updatedAt;
    this.planId = chatRoom.planId;
    this.planTitle = chatRoom.planTitle;
    this.planTripDate = chatRoom.planTripDate;
    this.quotePrice = chatRoom.quotePrice;
    this.userIds = chatRoom.userIds;
    this.lastChat = chatRoom.lastChat;
    this.isActive = chatRoom.isActive;
  }

  static create(data: ChatRoomProperties): IChatRoom {
    return new ChatRoom(data);
  }

  toDB(): ChatRoomProperties {
    return {
      id: this.id,
      userIds: this.userIds,
      planId: this.planId,
      planTitle: this.planTitle,
      planTripDate: this.planTripDate,
      quotePrice: this.quotePrice,
      isActive: this.isActive
    };
  }

  toClient(): ChatRoomProperties {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      userIds: this.userIds,
      planId: this.planId,
      planTitle: this.planTitle,
      planTripDate: this.planTripDate,
      quotePrice: this.quotePrice,
      isActive: this.isActive,
      lastChat: this.lastChat
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
