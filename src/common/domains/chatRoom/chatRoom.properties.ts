import { PopulatedDoc, Types } from 'mongoose';
import { ChatDocument } from 'src/providers/database/mongoose/chat.schema';

export interface IChatRoomDocument {
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  isDeletedAt: Date | null;
  userIds: string[];
  chatIds: PopulatedDoc<ChatDocument>[];
  planId: string;
  isActive: boolean;
}

export interface ChatRoomProperties {
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;
  planId: string;
  userIds: string[];
  chatIds?: string[] | { content: string };
  lastChat?: string;
  isActive?: boolean;
}

export interface ChatRoomObjectProperties {
  id: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
  planId: string;
  userIds: string[];
  chatIds: Types.ObjectId[];
  isActive?: boolean;
}
