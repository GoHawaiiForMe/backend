import IChat from './chat.interface';
import { ChatProperties, ChatToClientProperties } from './chat.properties';

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

  toDB(): ChatProperties {
    return {
      id: this.id,
      senderId: this.senderId,
      chatRoomId: this.chatRoomId,
      content: this.content
    };
  }

  toClient(): ChatToClientProperties {
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
