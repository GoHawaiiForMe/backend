import { ChatType } from 'src/common/constants/chat.type';

export interface ChatReference {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  chatRoomId: string;
  senderId: string | null;
  content: string;
}

export interface FindChatRoomByIdOptions {
  userId: string;
  chatRoomId: string;
}
export interface FileUploadData {
  type: ChatType;
  senderId: string;
  chatRoomId: string;
  file: Express.Multer.File;
}
