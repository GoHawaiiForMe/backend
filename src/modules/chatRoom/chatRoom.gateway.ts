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

@WebSocketGateway()
export default class ChatRoomGateway implements OnGatewayConnection {
  constructor(
    private readonly jwtGuard: WebSocketJwtGuard,
    private readonly chatRoomService: ChatRoomService
  ) {}
  handleDisconnection(client: Socket) {
    client.rooms.forEach((room) => {
      client.leave(room); // 모든 방에서 유저를 제거
      console.log(`User left chat room ${room}`);
    });
  }

  async handleConnection(client: Socket) {
    try {
      await this.jwtGuard.handleConnection(client);
      const user = this.jwtGuard.getUserFromSocket(client);

      if (user) {
        const { userId } = user;
        const userChatRoomIds = await this.chatRoomService.getChatRoomIds(userId);

        userChatRoomIds.forEach((chatRoomId) => {
          client.join(chatRoomId); // 채팅방에 유저를 연결
          console.log(`User ${user.id} joined chat room ${chatRoomId}`);
        });
      }
    } catch (e) {
      //로그. 인증 실패 로그남기기
      client.disconnect();
    }
  }
  @SubscribeMessage('joinChatRoom') //NOTE. 임시용
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
