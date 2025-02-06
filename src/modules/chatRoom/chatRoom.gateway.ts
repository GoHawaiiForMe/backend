import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import WebSocketJwtGuard from 'src/common/guards/webSocket.guard';
import ChatRoomService from './chatRoom.service';
import { ChatType } from 'src/common/constants/chat.type';
import SocketExceptionFilter from 'src/common/filters/socketExceptionFilter';
import { UseFilters } from '@nestjs/common';

@WebSocketGateway()
@UseFilters(SocketExceptionFilter)
export default class ChatRoomGateway implements OnGatewayConnection {
  constructor(
    private readonly jwtGuard: WebSocketJwtGuard,
    private readonly chatRoomService: ChatRoomService
  ) {}
  handleDisconnection(client: Socket) {
    const user = client.data.user;
    if (user) this.chatRoomService.removeClient(user.userId);
  }

  async handleConnection(client: Socket) {
    try {
      await this.jwtGuard.handleConnection(client);
      const user = this.jwtGuard.getUserFromSocket(client);

      if (user) {
        const { userId } = user;
        this.chatRoomService.registerClient(userId, client);
        await this.chatRoomService.joinUserRooms(userId, client);
      }
    } catch (e) {
      client.disconnect();
    }
  }

  @SubscribeMessage('ClientToServerMessage')
  async receiveMessage(
    @MessageBody() data: { chatRoomId: string; content: string; type: ChatType },
    @ConnectedSocket() client: Socket
  ) {
    const senderId = client.data.user.userId;
    await this.chatRoomService.postChat({ senderId, ...data });
  }
}
