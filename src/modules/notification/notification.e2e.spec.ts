import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import AppModule from 'src/app.module';
import GlobalExceptionFilter from 'src/common/filters/globalExceptionFilter';
import { RoleValues } from 'src/common/constants/role.type';
import AuthService from '../auth/auth.service';
import { seed } from 'src/providers/database/mongoose/mongoose.seed';

describe('Notification Test (e2e)', () => {
  let app: INestApplication;

  const dreamerId = process.env.DREAMER1_ID;
  const notificationId = process.env.NOTIFICATION_ID;

  let dreamerToken: string;

  jest.setTimeout(100000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true })).useGlobalFilters(new GlobalExceptionFilter());
    await app.init();

    const authService = app.get<AuthService>(AuthService);
    await seed();

    dreamerToken = authService.createTokens({ userId: dreamerId, role: RoleValues.DREAMER }).accessToken;
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await app.close();
  });

  describe('[GET /notifications]', () => {
    it('나의 알림 목록 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/notifications')
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('나의 채팅방 목록 조회, 비로그인 요청인 경우 401에러', async () => {
      const { statusCode } = await request(app.getHttpServer()).get('/notifications');

      expect(statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('[PATCH /notifications/{notificationId}]', () => {
    it('알림 읽음 처리', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch(`/notifications/${notificationId}`)
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
    });

    it('알림 읽음 처리, 이미 읽은 알림인 경우 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch(`/notifications/${notificationId}`)
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
    });

    it('알림 읽음 처리, 존재하지 않는 알림 ID인 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch(`/notifications/67918968c27c4c4cfe5c47ff`)
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
