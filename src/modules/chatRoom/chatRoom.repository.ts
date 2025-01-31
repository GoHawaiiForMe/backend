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

    const query = this.chatRoom.find({ userIds: userId });

    if (page && pageSize) {
      query.skip((page - 1) * pageSize).limit(pageSize);
    }

    const chatRooms = await query.populate({
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

  async findChatRoomById(id: string): Promise<IChatRoom> {
    const chatRoom = await this.chatRoom.findById(id).exec();
    const domainChatRoom = new ChatRoomMapper(chatRoom).toDomain();
    return domainChatRoom;
  }

  async createChatRoom(data: IChatRoom): Promise<IChatRoom> {
    const { planId, userIds } = data.toDB();
    const chatRoom = await this.chatRoom.create({
      planId,
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
