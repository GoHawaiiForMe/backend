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

    const authService = app.get<AuthService>(AuthService);

    dreamerToken = authService.createTokens({ userId: dreamerId, role: RoleValues.DREAMER }).accessToken;
    makerToken = authService.createTokens({ userId: makerId, role: RoleValues.MAKER }).accessToken;
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await app.close();
  });

  describe('[POST /follow]', () => {
    const dto = { makerId };

    it('찜하기', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post('/follow')
        .set('authorization', `Bearer ${dreamerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.NO_CONTENT);
    });

    it('찜하기, 이미 찜한 MAKER인 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post('/follow')
        .set('authorization', `Bearer ${dreamerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('찜하기, DREAMER가 아닌 경우 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post('/follow')
        .set('authorization', `Bearer ${makerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe('[DELETE /follow]', () => {
    const dto = { makerId };

    it('찜 취소하기', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete('/follow')
        .set('authorization', `Bearer ${dreamerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.NO_CONTENT);
    });

    it('찜 취소하기, 찜한 MAKER가 아닌 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete('/follow')
        .set('authorization', `Bearer ${dreamerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('찜 취소하기, DREAMER가 아닌 경우 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .delete('/follow')
        .set('authorization', `Bearer ${makerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });
});
