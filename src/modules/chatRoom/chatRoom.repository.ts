import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IChatRoom from './domain/chatRoom.interface';
import ChatRoomMapper from './domain/chatRoom.mapper';
import { ChatQueryOptions } from 'src/modules/chat/types/chat.type';
import { FindChatRoomByIdOptions } from 'src/modules/chatRoom/types/chatRoom.type';
import { ChatRoom } from 'src/providers/database/mongoose/chatRoom.schema';
import { ObjectId } from 'mongodb';
import TransactionManager from 'src/providers/database/transaction/transaction.manager';

@Injectable()
export default class ChatRoomRepository {
  constructor(@InjectModel(ChatRoom.name) private chatRoom: Model<ChatRoom>) {}

  async findManyChatRooms(options: ChatQueryOptions): Promise<IChatRoom[]> {
    const { userId, page, pageSize } = options;
    const chatRooms = await this.chatRoom
      .find({ userIds: userId })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .populate({
        path: 'chatIds',
        model: 'Chat',
        options: { sort: { createdAt: -1 }, limit: 1 },
        select: 'content type'
      });

    const domainChatRooms = chatRooms.map((chatRoom) => new ChatRoomMapper(chatRoom).toDomain());
    return domainChatRooms;
  }

  async totalCount(userId: string): Promise<number> {
    const totalCount = await this.chatRoom.count({ userIds: userId });
    return totalCount;
  }

  async findChatRoom(options: FindChatRoomByIdOptions): Promise<IChatRoom> {
    const { chatRoomId, planId } = options || {};
    const session = TransactionManager.getMongoSession();

    const chatRoom = await this.chatRoom
      .findOne({
        $or: [{ _id: chatRoomId }, { planId }]
      })
      .session(session)
      .exec();

    const domainChatRoom = new ChatRoomMapper(chatRoom).toDomain();
    return domainChatRoom;
  }

  async findActiveChatRoomIdsByUserId(userId: string): Promise<string[]> {
    const chatRooms = await this.chatRoom.find({ userIds: userId, isDeletedAt: null, isActive: true }).select('_id');
    return chatRooms.map((chatRoom) => chatRoom._id.toString());
  }

  async createChatRoom(data: IChatRoom): Promise<IChatRoom> {
    const session = TransactionManager.getMongoSession();
    const { userIds, planId, planTitle, planTripDate, quotePrice } = data.toDB();
    const [chatRoom] = await this.chatRoom.create(
      [
        {
          planId,
          planTitle,
          planTripDate,
          quotePrice,
          userIds,
          chatIds: []
        }
      ],
      { session }
    );

    const domainChatRoom = new ChatRoomMapper(chatRoom).toDomain();
    return domainChatRoom;
  }

  async update(data: IChatRoom): Promise<IChatRoom> {
    const session = TransactionManager.getMongoSession();
    const { planId, isActive, addChatId } = data.toDB();

    const chatRoom = await this.chatRoom
      .findOneAndUpdate({ planId }, { isActive, $addToSet: { chatIds: { $each: [addChatId] } } }, { new: true })
      .session(session);
    const domainChatRoom = new ChatRoomMapper(chatRoom).toDomain();
    return domainChatRoom;
  }

  async updateMany(planIds: string[]): Promise<number> {
    const result = await this.chatRoom.updateMany({ planId: { $in: planIds } }, { $set: { isActive: false } });
    return result.modifiedCount;
  }
}
