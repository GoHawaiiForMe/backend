import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import AppModule from 'src/app.module';
import GlobalExceptionFilter from 'src/common/filters/globalExceptionFilter';
import { RoleValues } from 'src/common/constants/role.type';
import AuthService from '../auth/auth.service';
import { mongooseSeed } from 'src/providers/database/mongoose/mongoose.seed';

describe('ChatRoom Test (e2e)', () => {
  let app: INestApplication;

  const makerId = process.env.MAKER1_ID;

  const dreamerId1 = process.env.DREAMER1_ID;
  const dreamerId2 = process.env.DREAMER2_ID;

  let makerToken: string;
  let dreamerToken1: string;
  let dreamerToken2: string;
  let chatRoomId: string;

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

  describe('[GET /chatRooms]', () => {
    it('나의 채팅방 목록 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/chatRooms')
        .set('authorization', `Bearer ${dreamerToken1}`);

      chatRoomId = body.list[0].id;
      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('나의 채팅방 목록 조회, 유효한 토큰이 오지 않을 경우 401에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get('/chatRooms')
        .set('authorization', `Bearer 123123123123`);

      expect(statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('[GET /chatRooms/{chatRoomId}]', () => {
    it('채팅방 단일조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get(`/chatRooms/${chatRoomId}`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('채팅방 단일조회, 유효한 토큰이 아닌 경우 401에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get(`/chatRooms/${chatRoomId}`)
        .set('authorization', `Bearer 123123`);

      expect(statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('채팅방 단일조회, 채팅방에 대한 권한이 없을 경우 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get(`/chatRooms/${chatRoomId}`)
        .set('authorization', `Bearer ${dreamerToken2}`);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('채팅방 단일조회, 없는 채팅방의 id으로 요청할 경우 404에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get(`/chatRooms/67a4bd750881d4415b0f3055`)
        .set('authorization', `Bearer ${dreamerToken2}`);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
