import { ChatType } from 'src/common/constants/chat.type';

export interface ChatProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeletedAt?: Date | null;
  type: ChatType;
  chatRoomId: string;
  senderId: string | null;
  content?: string;
  file?: Express.Multer.File;
}

export interface ChatToClientProperties {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeletedAt?: Date | null;
  isDeleted?: boolean;
  type: ChatType;
  chatRoomId: string;
  senderId: string | null;
  content: string;
}

export interface ChatToS3Properties {
  chatRoomId: string;
  file: Express.Multer.File;
}
