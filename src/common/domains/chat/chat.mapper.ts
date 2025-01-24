import { ChatDocument } from 'src/providers/database/mongoose/chat.schema';
import IChat from './chat.interface';
import Chat from './chat.domain';

export default class ChatMapper {
  constructor(private readonly chat: ChatDocument) {}

  toDomain(): IChat {
    if (!this.chat) return null;

    return new Chat({
      id: this.chat._id.toString(),
      createdAt: this.chat.createdAt,
      updatedAt: this.chat.updatedAt,
      senderId: this.chat.senderId,
      chatRoomId: this.chat.chatRoomId.toString(),
      content: this.chat.content
    });
  }
}
