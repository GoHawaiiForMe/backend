import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import AppModule from 'src/app.module';
import GlobalExceptionFilter from 'src/common/filters/globalExceptionFilter';
import DBClient from 'src/providers/database/prisma/DB.client';
import AuthService from '../auth/auth.service';
import { RoleValues } from 'src/common/constants/role.type';
import request from 'supertest';

describe('QuoteController (e2e)', () => {
  let app: INestApplication;

  const makerId1 = process.env.MAKER1_ID;
  const makerId2 = process.env.MAKER2_ID;
  const dreamerId1 = process.env.DREAMER1_ID;
  const dreamerId2 = process.env.DREAMER2_ID;

  const dreamer1PlanId = process.env.PENDING_PLAN_ID;

  const quoteId1 = process.env.QUOTE1_ID;
  const quoteId2 = process.env.QUOTE2_ID;
  const toBeDeleteQuoteId = process.env.TO_BE_DELETE_QUOTE_ID;

  let makerToken: string;
  let dreamerToken1: string;
  let dreamerToken2: string;
  let toBeConfirmedQuoteId: string;

  jest.setTimeout(100000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    //.useGlobalFilters(new GlobalExceptionFilter());
    await app.init();

    const prismaDB = app.get<DBClient>(DBClient);
    const authService = app.get<AuthService>(AuthService);

    await prismaDB.seedForTestEnvironment();
    makerToken = authService.createTokens({ userId: makerId1, role: RoleValues.MAKER }).accessToken;
    dreamerToken1 = authService.createTokens({ userId: dreamerId1, role: RoleValues.DREAMER }).accessToken;
    dreamerToken2 = authService.createTokens({ userId: dreamerId2, role: RoleValues.DREAMER }).accessToken;
  });

  afterAll(async () => {
    const prismaDB = app.get<DBClient>(DBClient);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await prismaDB.$disconnect();
    await app.close();
  });

  describe('[GET /plans/{planId}/quotes]', () => {
    it('드리머가 보는 해당 플랜의 견적 리스트', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get(`/plans/${dreamer1PlanId}/quotes`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('본인이 아닌 플랜의 견적을 보려고 할 때 403에러', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get(`/plans/${dreamer1PlanId}/quotes`)
        .set('authorization', `Bearer ${dreamerToken2}`);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
      expect(body).toBeDefined();
    });

    it('없는 플랜의 견적 리스트를 보려고 할 때 404에러', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get(`/plans/123123123123123/quotes`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(body).toBeDefined();
    });
  });

  describe('[GET /quotes]', () => {
    it('메이커의 견적 리스트 보기', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/quotes?isSent=true')
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('메이커의 견적 리스트를 드리머가 요청한다면 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get('/quotes?isSent=true')
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('메이커의 견적 리스트에서 isSent 쿼리를 누락할 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get('/quotes')
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('[GET /quotes/{quoteId} 견적 단일조회', () => {
    it('견적 단일 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get(`/quotes/${quoteId1}`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('권한이 없는 견적 단일 조회할 경우 403 에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get(`/quotes/${quoteId2}`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('없는 견적의 id로 단일 조회할 경우 404 에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get(`/quotes/123123123`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('[POST /plans/{planId}/quotes]', () => {
    const dto = {
      price: 150,
      content: '저 잘해요'
    };

    it('견적 생성하기', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post(`/plans/${dreamer1PlanId}/quotes`)
        .set('authorization', `Bearer ${makerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.CREATED);
      expect(body).toBeDefined();
      toBeConfirmedQuoteId = body.id;
    });

    it('없는 플랜의 id로 견적 생성할 경우 404 에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post(`/plans/123123123123123/quotes`)
        .set('authorization', `Bearer ${makerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('이미 나의 견적이 있는 플랜에 견적 생성 요청을 할 경우 409 에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post(`/plans/${dreamer1PlanId}/quotes`)
        .set('authorization', `Bearer ${makerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.CONFLICT);
    });

    it('메이커가 아닌경우 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post(`/plans/${dreamer1PlanId}/quotes`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe('[PATCH /quotes/{quoteId}/confirm]', () => {
    it('견적 확정하기', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch(`/quotes/${toBeConfirmedQuoteId}/confirm`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('견적 확정하기 요청 시 isConfirmed쿼리에 true를 제외하고 값을 넣을 경우 400에러', async () => {
      const confirmedDto = { isConfirmed: false };
      const { statusCode } = await request(app.getHttpServer())
        .patch(`/quotes/${toBeConfirmedQuoteId}/confirm`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send(confirmedDto);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('해당 견적이 없는데 견적 확정하기를 할 경우 404에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch(`/quotes/123123123/confirm`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('해당 견적의 플랜을 만든 Dreamer가 아닌데 요청하는 경우 403 에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch(`/quotes/${toBeConfirmedQuoteId}/confirm`)
        .set('authorization', `Bearer ${dreamerToken2}`);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });

    it('해당 플랜이 PENDING 상태가 아닌데 확정하기 요청을 할 경우 400 에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch(`/quotes/${toBeConfirmedQuoteId}/confirm`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('[DELETE /quotes/{quoteId}]', () => {
    it('견적 삭제하기', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .delete(`/quotes/${toBeDeleteQuoteId}`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.NO_CONTENT);
      expect(body).toEqual({});
    });

    it('없는 견적의 id로 삭제할 경우 404 에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/quotes/123123123`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('플랜의 상태가 PENDING이 아닌 견적을 삭제할 경우 400 에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/quotes/${toBeConfirmedQuoteId}`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('다른사람의 견적을 삭제할 경우 403 에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete(`/quotes/${quoteId2}`)
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });
});
