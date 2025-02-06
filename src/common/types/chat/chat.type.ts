import { ChatType } from 'src/common/constants/chat.type';

export interface ChatQueryOptions {
  userId: string;
  chatRoomId?: string;
  page?: number;
  pageSize?: number;
}

export interface ChatCreateData {
  senderId: string;
  type: ChatType;
  chatRoomId: string;
  content: string;
}
