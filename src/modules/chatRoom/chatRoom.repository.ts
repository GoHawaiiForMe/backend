import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IChatRoom from 'src/common/domains/chatRoom/chatRoom.interface';
import ChatRoomMapper from 'src/common/domains/chatRoom/chatRoom.mapper';
import { ChatQueryOptions } from 'src/common/types/chat/chat.type';
import { ChatRoom } from 'src/providers/database/mongoose/chatRoom.schema';

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
        select: 'content'
      });

    const domainChatRooms = chatRooms.map((chatRoom) => new ChatRoomMapper(chatRoom).toDomain());
    return domainChatRooms;
  }

  async totalCount(userId: string): Promise<number> {
    const totalCount = await this.chatRoom.count({ userIds: userId });
    return totalCount;
  }

  async findChatRoomIdByUserId(userId: string): Promise<string[]> {
    const chatRooms = await this.chatRoom.find({ userIds: userId, isDeletedAt: null, isActive: true }).select('_id');
    return chatRooms.map((chatRoom) => chatRoom._id.toString());
  }

  async findChatRoomById(id: string): Promise<IChatRoom> {
    const chatRoom = await this.chatRoom.findById(id).exec();
    const domainChatRoom = new ChatRoomMapper(chatRoom).toDomain();
    return domainChatRoom;
  }

  async createChatRoom(data: IChatRoom): Promise<IChatRoom> {
    const { userIds, planId, planTitle, planTripDate, quotePrice } = data.toDB();
    const chatRoom = await this.chatRoom.create({
      planId,
      planTitle,
      planTripDate,
      quotePrice,
      userIds,
      chatIds: []
    });

    const domainChatRoom = new ChatRoomMapper(chatRoom).toDomain();
    return domainChatRoom;
  }

  async exists(planId: string): Promise<boolean> {
    const chatRoom = await this.chatRoom.findOne({ planId });
    return !!chatRoom;
  }
}
