import { Types } from 'mongoose';

export interface ChatProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  senderId: string | null;
  chatRoomId: string;
  content: string;
}

export interface ChatObjectProperties {
  id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  senderId: string;
  chatRoomId: Types.ObjectId;
  content: string;
}
