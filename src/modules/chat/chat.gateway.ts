import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets';
import ChatService from './chat.service';
import { Socket } from 'socket.io';
import WebSocketJwtGuard from 'src/common/guards/webSocket.guard';

@WebSocketGateway()
export default class ChatGateway implements OnGatewayConnection {
  constructor(
    private readonly jwtGuard: WebSocketJwtGuard,
    private readonly chatService: ChatService
  ) {}
  handleDisconnection(client: Socket) {
    return;
  }

  async handleConnection(client: Socket) {
    try {
      //const
      await this.jwtGuard.handleConnection(client);
      const user = this.jwtGuard.getUserFromSocket(client);

      if (user) {
        // this.chatService.register
      }
    } catch (e) {
      //로그. 인증 실패 로그남기기
      client.disconnect();
    }
  }
  @SubscribeMessage('joinChatRoom')
  async joinChatRoom(@MessageBody() chatRoomId: string, @ConnectedSocket() client: Socket) {}

  @SubscribeMessage('receiveMessage')
  async receiveMessage(@MessageBody() data: { message: string }, @ConnectedSocket() client: Socket) {
    console.log('receiveMessage');
    console.log(data);
    console.log(client);
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() data: { message: string }, @ConnectedSocket() client: Socket) {
    client.emit('sendMessage', {
      ...data,
      from: 'server'
    });
  }
}
