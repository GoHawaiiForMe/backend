import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import IChat from 'src/common/domains/chat/chat.interface';
import ChatMapper from 'src/common/domains/chat/chat.mapper';
import { Chat } from 'src/providers/database/mongoose/chat.schema';
import { ChatRoom } from 'src/providers/database/mongoose/chatRoom.schema';

@Injectable()
export default class ChatRepository {
  constructor(
    @InjectModel(ChatRoom.name) private chatRoom: Model<ChatRoom>,
    @InjectModel(Chat.name) private chat: Model<Chat>
  ) {}

  async findChatById(id: string): Promise<IChat> {
    const chat = await this.chat.findById(id);
    const domainChat = new ChatMapper(chat).toDomain();

    return domainChat;
  }

  async createChat(data: IChat): Promise<IChat> {
    const { senderId, chatRoomId, content } = data.toDB();

    const chat = await this.chat.create({
      senderId,
      chatRoomId,
      content
    });

    const chatRoom = await this.chatRoom.updateOne(
      { _id: chatRoomId },
      { $push: { chatIds: chat._id } } // chatIds 배열에 채팅 ID 추가
    );
    if (chatRoom.modifiedCount === 0) {
      throw Error('채팅방 업데이트에 실패했습니다.');
    } //NOTE. 로그남기기용 에러, 클라이언트에는 500이 가도록 유도

    const domainChat = new ChatMapper(chat).toDomain();

    return domainChat;
  }
}
