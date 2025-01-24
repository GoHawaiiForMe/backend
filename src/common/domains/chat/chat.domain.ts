import { Types } from 'mongoose';
import IChat from './chat.interface';
import { ChatObjectProperties, ChatProperties } from './chat.properties';

export default class Chat implements IChat {
  private id?: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private senderId: string | null;
  private chatRoomId: string;
  private content: string;

  constructor(chat: ChatProperties) {
    this.id = chat?.id;
    this.createdAt = chat.createdAt;
    this.updatedAt = chat.updatedAt;
    this.senderId = chat.senderId;
    this.chatRoomId = chat.chatRoomId;
    this.content = chat.content;
  }

  static create(data: ChatProperties): IChat {
    return new Chat(data);
  }

  toDB(): ChatObjectProperties {
    return {
      id: new Types.ObjectId(this.id),
      senderId: this.senderId,
      chatRoomId: new Types.ObjectId(this.chatRoomId),
      content: this.content
    };
  }

  toClient(): ChatProperties {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      senderId: this.senderId,
      chatRoomId: this.chatRoomId,
      content: this.content
    };
  }
}
