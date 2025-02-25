import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import IChat from './domain/chat.interface';
import ChatMapper from './domain/chat.mapper';
import InternalServerError from 'src/common/errors/internalServerError';
import { ChatQueryOptions } from 'src/modules/chat/types/chat.type';
import { Chat } from 'src/providers/database/mongoose/chat.schema';
import { ChatRoom } from 'src/providers/database/mongoose/chatRoom.schema';
import TransactionManager from 'src/providers/database/transaction/transaction.manager';

@Injectable()
export default class ChatRepository {
  constructor(@InjectModel(Chat.name) private chat: Model<Chat>) {}

  async findChatsByChatRoomId(options: ChatQueryOptions): Promise<IChat[]> {
    const { chatRoomId, page, pageSize } = options;
    const skip = (page - 1) * pageSize;
    const chats = await this.chat.find({ chatRoomId }).skip(skip).limit(pageSize).sort({ createdAt: -1 });

    const domainChats = chats.map((chat) => new ChatMapper(chat).toDomain());

    return domainChats;
  }

  async totalCount(chatRoomId: string): Promise<number> {
    const totalCount = await this.chat.countDocuments({ chatRoomId });
    return totalCount;
  }

  async findChatById(id: string): Promise<IChat> {
    const session = TransactionManager.getMongoSession();
    const chat = await this.chat.findById(id).session(session);
    const domainChat = new ChatMapper(chat).toDomain();

    return domainChat;
  }

  async createChat(data: IChat): Promise<IChat> {
    const { senderId, chatRoomId, content, type } = data.toDB();
    const session = TransactionManager.getMongoSession();

    const [chat] = await this.chat.create(
      [
        {
          senderId,
          chatRoomId,
          content,
          type
        }
      ],
      { session }
    );

    const domainChat = new ChatMapper(chat).toDomain();
    return domainChat;
  }

  async delete(id: string): Promise<IChat> {
    const session = TransactionManager.getMongoSession();
    const chat = await this.chat.findOneAndUpdate(
      { _id: id, isDeletedAt: null },
      { isDeletedAt: new Date() },
      { new: true, session }
    );

    const domainChat = new ChatMapper(chat).toDomain();

    return domainChat;
  }
}
