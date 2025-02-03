import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
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
    const user = client.data.user;
    if (user) {
      this.chatRoomService.removeClient(user.userId);
    }
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
      //TO.LOG 로그. 인증 실패 로그남기기
      client.disconnect();
    }
  }
}
