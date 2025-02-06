import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import IChat from 'src/common/domains/chat/chat.interface';
import ChatMapper from 'src/common/domains/chat/chat.mapper';
import InternalServerError from 'src/common/errors/internalServerError';
import { ChatQueryOptions } from 'src/common/types/chat/chat.type';
import { Chat } from 'src/providers/database/mongoose/chat.schema';
import { ChatRoom } from 'src/providers/database/mongoose/chatRoom.schema';

@Injectable()
export default class ChatRepository {
  constructor(
    @InjectModel(ChatRoom.name) private chatRoom: Model<ChatRoom>,
    @InjectModel(Chat.name) private chat: Model<Chat>
  ) {}

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
    const chat = await this.chat.findById(id);
    const domainChat = new ChatMapper(chat).toDomain();

    return domainChat;
  }

  async createChat(data: IChat): Promise<IChat> {
    const { senderId, chatRoomId, content, type } = data.toDB();

    const chat = await this.chat.create({
      senderId,
      chatRoomId,
      content,
      type
    });

    const chatRoom = await this.chatRoom.updateOne(
      { _id: chatRoomId },
      { $push: { chatIds: chat._id } } // chatIds 배열에 채팅 ID 추가
    );
    if (chatRoom.modifiedCount === 0) {
      throw new InternalServerError(ErrorMessage.INTERNAL_SERVER_ERROR_CHAT_ROOM_UPDATE);
    }

    const domainChat = new ChatMapper(chat).toDomain();

    return domainChat;
  }
}
