import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import AppModule from 'src/app.module';
import GlobalExceptionFilter from 'src/common/filters/globalExceptionFilter';
import DBClient from 'src/providers/database/prisma/DB.client';
import { RoleValues } from 'src/common/constants/role.type';
import AuthService from '../auth/auth.service';

describe('Review Test (e2e)', () => {
  let app: INestApplication;

  const makerId = process.env.MAKER1_ID;
  const dreamerId = process.env.DREAMER1_ID;
  const completedPlanId = process.env.COMPLETED_PLAN_ID;
  const pendingPlanId = process.env.PENDING_PLAN_ID;

  let makerToken: string;
  let dreamerToken: string;

  jest.setTimeout(100000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true })).useGlobalFilters(new GlobalExceptionFilter());
    await app.init();

    const prismaDB = app.get<DBClient>(DBClient);
    const authService = app.get<AuthService>(AuthService);

    await prismaDB.seedForTestEnvironment();
    dreamerToken = authService.createTokens({ userId: dreamerId, role: RoleValues.DREAMER }).accessToken;
    makerToken = authService.createTokens({ userId: makerId, role: RoleValues.MAKER }).accessToken;
  });

  afterAll(async () => {
    const prismaDB = app.get<DBClient>(DBClient);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await prismaDB.$disconnect();
    await app.close();
  });

  describe('[GET /reviews/me]', () => {
    it('리뷰 전체 목록 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/reviews/me')
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('리뷰 전체 목록 조회 - DREAMER가 아닌 경우 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get('/reviews/me')
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe('[GET /reviews/{makerId}]', () => {
    it('메이커 ID를 통한 리뷰 목록 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get(`/reviews/${makerId}`)
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });
  });

  describe('[POST /reviews]', () => {
    const dto = {
      makerId,
      rating: 5,
      content: '좋은 메이커입니다!',
      planId: completedPlanId
    };
    const pendingDto = { ...dto, planId: pendingPlanId };

    it('리뷰 생성하기', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/reviews')
        .set('authorization', `Bearer ${dreamerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.CREATED);
      expect(body).toBeDefined();
    });

    it('리뷰 생성하기 - DREAMER가 아닌 경우 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post('/reviews')
        .set('authorization', `Bearer ${makerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('리뷰 생성하기 - 플랜이 COMPLETED 상태가 아닌 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post('/reviews')
        .set('authorization', `Bearer ${dreamerToken}`)
        .send(pendingDto);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
