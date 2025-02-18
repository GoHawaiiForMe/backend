import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import AppModule from 'src/app.module';
import GlobalExceptionFilter from 'src/common/filters/globalExceptionFilter';
import { RoleValues } from 'src/common/constants/role.type';
import AuthService from '../auth/auth.service';
import { mongooseSeed } from 'src/providers/database/mongoose/mongoose.seed';
import path from 'path';
import fs from 'fs';
import { ChatType } from 'src/common/constants/chat.type';

describe('Chat Test (e2e)', () => {
  let app: INestApplication;

  const makerId = process.env.MAKER1_ID;

  const dreamerId1 = process.env.DREAMER1_ID;
  const dreamerId2 = process.env.DREAMER2_ID;
  const chatRoomId = process.env.CHAT_ROOM_ID;
  const deActiveChatRoomId = process.env.DE_ACTIVE_CHAT_ROOM_ID;
  const chatId = process.env.CHAT_ID;

  let makerToken: string;
  let dreamerToken1: string;
  let dreamerToken2: string;
  let imageChatId: string;

  jest.setTimeout(100000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true })).useGlobalFilters(new GlobalExceptionFilter());
    await app.init();

    const authService = app.get<AuthService>(AuthService);
    await mongooseSeed();

    makerToken = authService.createTokens({ userId: makerId, role: RoleValues.MAKER }).accessToken;
    dreamerToken1 = authService.createTokens({ userId: dreamerId1, role: RoleValues.DREAMER }).accessToken;
    dreamerToken2 = authService.createTokens({ userId: dreamerId2, role: RoleValues.DREAMER }).accessToken;
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await app.close();
  });

  describe('[GET /chatRooms/{chatRoomId}/chats]', () => {
    it('채팅방의 채팅 기록 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get(`/chatRooms/${chatRoomId}/chats`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('채팅방의 채팅 기록 조회, 나의 채팅방이 아닌 경우 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get(`/chatRooms/${chatRoomId}/chats`)
        .set('authorization', `Bearer ${dreamerToken2}`);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('채팅방의 채팅 기록 조회, 유효한 토큰이 아닌 경우 401에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get(`/chatRooms/${chatRoomId}/chats`)
        .set('authorization', `Bearer 123123`);

      expect(statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('[POST /chatRooms/{chatRoomId}/chats]', () => {
    it('채팅방 파일 업로드', async () => {
      const filePath = path.join(__dirname, '../../../test/test.png');
      const fileBuffer = fs.readFileSync(filePath);

      const { body, statusCode } = await request(app.getHttpServer())
        .post(`/chatRooms/${chatRoomId}/chats`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .field('type', ChatType.IMAGE)
        .attach('file', fileBuffer, 'test.png');

      imageChatId = body.id;
      expect(statusCode).toBe(HttpStatus.CREATED);
      expect(body).toBeDefined();
    });

    it('채팅방 파일 업로드, 권한이 없는 채팅방에 업로드할 경우 403 에러', async () => {
      const filePath = path.join(__dirname, '../../../test/test.png');
      const fileBuffer = fs.readFileSync(filePath);

      const { statusCode } = await request(app.getHttpServer())
        .post(`/chatRooms/${chatRoomId}/chats`)
        .set('authorization', `Bearer ${dreamerToken2}`)
        .field('type', ChatType.IMAGE)
        .attach('file', fileBuffer, 'test.png');

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('채팅방 파일 업로드, 비활성화 된 채팅방에 요청할 경우 400 에러', async () => {
      const filePath = path.join(__dirname, '../../../test/test.png');
      const fileBuffer = fs.readFileSync(filePath);

      const { statusCode } = await request(app.getHttpServer())
        .post(`/chatRooms/${deActiveChatRoomId}/chats`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .field('type', ChatType.IMAGE)
        .attach('file', fileBuffer, 'test.png');

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('채팅방 파일 업로드, 용량 초과 파일 업로드 요청할 경우 400 에러', async () => {
      const filePath = path.join(__dirname, '../../../test/oversize.jpg');
      const fileBuffer = fs.readFileSync(filePath);

      const { statusCode } = await request(app.getHttpServer())
        .post(`/chatRooms/${chatRoomId}/chats`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .field('type', ChatType.IMAGE)
        .attach('file', fileBuffer, 'oversize.jpg');

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('[DELETE /chats/{chatId}]', () => {
    it('채팅 메시지 삭제', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .delete(`/chats/${chatId}`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.NO_CONTENT);
      expect(body).toEqual({});
    });

    it('채팅 메시지 삭제, 비활성화된 채팅방의 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/chats/${deActiveChatRoomId}`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('채팅 메시지 삭제, 메시지 작성자가 아닌 경우 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/chats/${chatId}`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('채팅 메시지 삭제, 없는 메시지의 경우 404에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/chats/67a4bd750881d4415b0f3055`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('채팅 메시지 삭제, 이미 삭제된 메시지의 경우 409에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/chats/${chatId}`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.CONFLICT);
    });
  });

  describe('[GET /chats/{chatId}/downloadFile]', () => {
    it('이미지나 동영상의 원본파일 요청하기', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get(`/chats/${imageChatId}/downloadFile`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('이미지나 동영상의 원본파일 요청하기, TEXT타입 채팅의 id로 요청할 경우 400 에러', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get(`/chats/${chatId}/downloadFile`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(body).toBeDefined();
    });

    it('이미지나 동영상의 원본파일 요청하기, 본인이 속한 채팅방의 메시지가 아닌 경우 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get(`/chats/${imageChatId}/downloadFile`)
        .set('authorization', `Bearer ${dreamerToken2}`);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('이미지나 동영상의 원본파일 요청하기, 없는 메시지의 id로 요청한 경우 404에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get(`/chats/67a4bd750881d4415b0f3055/downloadFile`)
        .set('authorization', `Bearer ${dreamerToken2}`);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
