import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { Socket } from 'socket.io';
import UnauthorizedError from '../errors/unauthorizedError';
import ErrorMessage from '../constants/errorMessage.enum';

@Injectable()
export default class WebSocketJwtGuard {
  constructor(private readonly jwtService: JwtService) {}

  // 클라이언트가 웹소켓 연결 시 JWT 토큰을 검증하는 메소드
  async handleConnection(client: Socket): Promise<void> {
    const token = client.handshake.headers['authorization']?.split(' ')[1]; // Authorization 헤더에서 Bearer 토큰 추출
    if (!token) {
      throw new UnauthorizedError(ErrorMessage.TOKEN_UNAUTHORIZED_NOTFOUND);
    }

    try {
      const decoded = this.jwtService.verify(token); // JWT 검증
      client.data.user = decoded; // 인증된 사용자 정보 클라이언트 객체에 저장
    } catch (error) {
      throw new UnauthorizedError(ErrorMessage.TOKEN_UNAUTHORIZED_VALIDATION);
    }
  }

  // 클라이언트에서 인증된 사용자 정보를 가져오는 메소드
  getUserFromSocket(client: Socket) {
    return client.data.user; // 클라이언트 데이터에서 사용자 정보 반환
  }
}
