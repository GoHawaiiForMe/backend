import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import ChatService from './chat.service';

@WebSocketGateway()
export default class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('ClientToServerMessage')
  async receiveMessage(
    @MessageBody() data: { chatRoomId: string; content: string },
    @ConnectedSocket() client: Socket
  ) {
    const senderId = client.data.user.userId;
    await this.chatService.postChat({ senderId, ...data });
  }
}
