import { Types } from 'mongoose';

export interface ChatQueryOptions {
  userId: string;
  page: number;
  pageSize: number;
}

export interface ChatCreateData {
  senderId: string;
  chatRoomId: string;
  content: string;
}
