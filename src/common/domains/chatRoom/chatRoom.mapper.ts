import { ChatRoomDocument } from 'src/providers/database/mongoose/chatRoom.schema';
import ChatRoom from './chatRoom.domain';
import IChatRoom from './chatRoom.interface';

export default class ChatRoomMapper {
  constructor(private readonly chatRoom: ChatRoomDocument) {}

  toDomain(): IChatRoom {
    if (!this.chatRoom) return null;

    let lastChat: string;

    if (this.chatRoom.chatIds && this.chatRoom.chatIds[0] && 'content' in this.chatRoom.chatIds[0]) {
      lastChat = this.chatRoom.chatIds[0].content;
    } else lastChat = null;

    return new ChatRoom({
      id: this.chatRoom._id.toString(),
      createdAt: this.chatRoom.createdAt,
      updatedAt: this.chatRoom.updatedAt,
      planId: this.chatRoom.planId,
      userIds: this.chatRoom.userIds,
      isActive: this.chatRoom.isActive,
      lastChat
    });
  }
}
