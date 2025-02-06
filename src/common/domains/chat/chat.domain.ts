import { ChatType } from 'src/common/constants/chat.type';
import IChat from './chat.interface';
import { ChatProperties, ChatToClientProperties, ChatToS3Properties } from './chat.properties';

export default class Chat implements IChat {
  private id?: string;
  private createdAt?: Date;
  private updatedAt?: Date;
  private type: ChatType;
  private senderId: string | null;
  private chatRoomId: string;
  private content?: string;
  private file?: Express.Multer.File;

  constructor(chat: ChatProperties) {
    this.id = chat?.id;
    this.createdAt = chat.createdAt;
    this.updatedAt = chat.updatedAt;
    this.type = chat.type;
    this.senderId = chat.senderId;
    this.chatRoomId = chat.chatRoomId;
    this.content = chat.content;
    this.file = chat.file;
  }

  static create(data: ChatProperties): IChat {
    return new Chat(data);
  }

  toDB(): ChatProperties {
    return {
      id: this.id,
      type: this.type,
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
      type: this.type,
      senderId: this.senderId,
      chatRoomId: this.chatRoomId,
      content: this.content
    };
  }

  toS3(): ChatToS3Properties {
    return {
      chatRoomId: this.chatRoomId,
      file: this.file
    };
  }

  setS3Key(s3key: string): void {
    this.content = s3key;
  }
}
