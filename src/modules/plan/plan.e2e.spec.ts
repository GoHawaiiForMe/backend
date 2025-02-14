import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import AppModule from 'src/app.module';
import GlobalExceptionFilter from 'src/common/filters/globalExceptionFilter';
import DBClient from 'src/providers/database/prisma/DB.client';
import { RoleValues } from 'src/common/constants/role.type';
import AuthService from '../auth/auth.service';

describe('PlanController (e2e)', () => {
  let app: INestApplication;

  const makerId = process.env.MAKER1_ID;

  const dreamerId1 = process.env.DREAMER1_ID;
  const dreamerId2 = process.env.DREAMER2_ID;

  const pendingPlanId = process.env.PENDING_PLAN_ID;
  const confirmedPlanId = process.env.CONFIRMED_PLAN_ID;
  const toBeCompletedPlanId = process.env.TO_BE_COMPLETED_PLAN_ID;

  let makerToken: string;
  let dreamerToken1: string;
  let dreamerToken2: string;

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
    makerToken = authService.createTokens({ userId: makerId, role: RoleValues.MAKER }).accessToken;
    dreamerToken1 = authService.createTokens({ userId: dreamerId1, role: RoleValues.DREAMER }).accessToken;
    dreamerToken2 = authService.createTokens({ userId: dreamerId2, role: RoleValues.DREAMER }).accessToken;
  });

  afterAll(async () => {
    const prismaDB = app.get<DBClient>(DBClient);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await prismaDB.$disconnect();
    await app.close();
  });

  describe('[GET /plans/groupCount]', () => {
    it('should get serviceArea count', async () => {
      const { body, statusCode } = await request(app.getHttpServer()).get('/plans/groupCount');

      expect(statusCode).toBe(200);
      expect(body).toBeDefined();
    });

    it('should get tripType count', async () => {
      const { body, statusCode } = await request(app.getHttpServer()).get('/plans/groupCount?serviceArea=SEOUL');

      expect(statusCode).toBe(200);
      expect(body).toBeDefined();
    });
  });

  describe('[GET /plans/dreamer]', () => {
    it('should get my plan List', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/plans/dreamer')
        .set('authorization', `Bearer ${dreamerToken1}`);

      const { list, totalCount } = body;

      expect(statusCode).toBe(200);
      expect(body).toBeDefined();
    });

    it('드리머의 토큰이 아니라면 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get('/plans/dreamer')
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(403);
    });
  });

  describe('[GET /plans/maker]', () => {
    it('메이커의 플랜 리스트', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/plans/maker')
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(200);
      expect(body).toBeDefined();
    });

    it('메이커의 토큰이 아니라면 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get('/plans/maker')
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(403);
    });
  });

  describe('[GET /plans/{planId}]', () => {
    it('플랜 단일조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get(`/plans/${pendingPlanId}`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(200);
      expect(body).toBeDefined();
    });

    it('없는 플랜의 id로 단일조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/plans/1111111111111111111111')
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(404);
    });
  });

  describe('[POST /plans]', () => {
    const dto = {
      title: '제목',
      tripDate: '2025-03-19T00:00:00.000Z',
      tripType: 'SHOPPING',
      serviceArea: 'SEOUL',
      details: '상세내용',
      address: '청와대 1호실'
    };

    it('플랜 생성하기', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/plans')
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send(dto);

      expect(statusCode).toBe(201);
      expect(body).toBeDefined();
    });

    it('플랜 생성하기, 드리머가 아니라면 403에러', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/plans')
        .set('authorization', `Bearer ${makerToken}`)
        .send(dto);

      expect(statusCode).toBe(403);
    });
  });

  describe('[POST /plans/{planId}/assign]', () => {
    it('지정견적 요청하기', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post(`/plans/${pendingPlanId}/assign`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send({ assigneeId: makerId });

      expect(statusCode).toBe(201);
      expect(body).toBeDefined();
    });

    it('다른사람 플랜의 지정견적 요청하기, 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post(`/plans/${pendingPlanId}/assign`)
        .set('authorization', `Bearer ${dreamerToken2}`)
        .send({ assigneeId: makerId });

      expect(statusCode).toBe(403);
    });

    it('없는 플랜 id로 지정견적 요청하기, 404에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post(`/plans/23123123123123/assign`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send({ assigneeId: makerId });

      expect(statusCode).toBe(404);
    });

    it('메이커가 아닌 유저에게 지정견적 요청하기, 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post(`/plans/${pendingPlanId}/assign`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send({ assigneeId: dreamerId2 });

      expect(statusCode).toBe(400);
    });

    it('메이커가 아닌 유저에게 지정견적 요청하기, 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post(`/plans/${pendingPlanId}/assign`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send({ assigneeId: dreamerId2 });

      expect(statusCode).toBe(400);
    });

    it('존재하지 않는 유저의 id로 지정견적 요청하기, 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post(`/plans/${pendingPlanId}/assign`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send({ assigneeId: '11111111111' });

      expect(statusCode).toBe(400);
    });

    it('지정견적 중복 요청하기, 409에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post(`/plans/${pendingPlanId}/assign`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send({ assigneeId: makerId });

      expect(statusCode).toBe(409);
    });

    it('PENDING이 아닌 플랜으로 지정견적 요청하기, 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post(`/plans/${confirmedPlanId}/assign`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send({ assigneeId: dreamerId2 });

      expect(statusCode).toBe(400);
    });
  });

  describe('[DELETE /plans/{planId}/assign]', () => {
    it('지정견적 요청 거부하기', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .delete(`/plans/${pendingPlanId}/assign`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(204);
      expect(body).toEqual({});
    });

    it('Maker가 아닌 경우, 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/plans/${confirmedPlanId}/assign`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(403);
    });

    it('지정견적 요청 받은적 없는 플랜의 지정견적 요청 거부하기, 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/plans/${pendingPlanId}/assign`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(400);
    });

    it('없는 플랜 id로 지정견적 요청 거부하기, 404에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/plans/123123123123/assign`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(404);
    });

    it('PENDING이 아닌 플랜의 지정견적 요청 거부, 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/plans/${confirmedPlanId}/assign`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(400);
    });
  });

  describe('[PATCH /plans/{planId}/complete]', () => {
    it('Plan 완료 요청', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch(`/plans/${toBeCompletedPlanId}/complete`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(200);
      expect(body).toBeDefined();
    });

    it('CONFIRMED상태가 아닌 플랜의 완료 요청, 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch(`/plans/${pendingPlanId}/complete`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(400);
    });

    it('없는 Plan의 id로 완료 요청, 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch(`/plans/1123123123/complete`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(404);
    });

    it('다른사람 플랜의 완료 요청, 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch(`/plans/${toBeCompletedPlanId}/complete`)
        .set('authorization', `Bearer ${dreamerToken2}`);

      expect(statusCode).toBe(403);
    });
  });

  describe('[DELETE /plans/{planId}]', () => {
    it('플랜 삭제하기', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .delete(`/plans/${pendingPlanId}`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(204);
      expect(body).toEqual({});
    });

    it('CONFIRMED 플랜 삭제하기 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/plans/${confirmedPlanId}`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(400);
    });

    it('다른사람의 플랜 삭제하기 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/plans/${toBeCompletedPlanId}`)
        .set('authorization', `Bearer ${dreamerToken2}`);

      expect(statusCode).toBe(403);
    });
  });
});
