import { ChatRoomDocument } from 'src/providers/database/mongoose/chatRoom.schema';
import ChatRoom from './chatRoom.domain';
import IChatRoom from './chatRoom.interface';
import { ChatType } from 'src/common/constants/chat.type';

export default class ChatRoomMapper {
  constructor(private readonly chatRoom: ChatRoomDocument) {}

  toDomain(): IChatRoom {
    if (!this.chatRoom) return null;

    let lastChat: string;
    if (
      this.chatRoom.chatIds &&
      this.chatRoom.chatIds[0] &&
      typeof this.chatRoom.chatIds[0] === 'object' &&
      'content' in this.chatRoom.chatIds[0]
    ) {
      switch (this.chatRoom.chatIds[0].type) {
        case ChatType.VIDEO:
          lastChat = '동영상';
          break;
        case ChatType.IMAGE:
          lastChat = '이미지';
          break;
        default:
          lastChat = this.chatRoom.chatIds[0].content;
      }
    } else lastChat = null;

    return new ChatRoom({
      id: this.chatRoom._id.toString(),
      createdAt: this.chatRoom.createdAt,
      updatedAt: this.chatRoom.updatedAt,
      planId: this.chatRoom.planId,
      planTitle: this.chatRoom.planTitle,
      planTripDate: this.chatRoom.planTripDate,
      quotePrice: this.chatRoom.quotePrice,
      userIds: this.chatRoom.userIds,
      isActive: this.chatRoom.isActive,
      lastChat
    });
  }
}
