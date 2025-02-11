import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import AppModule from 'src/app.module';
import GlobalExceptionFilter from 'src/common/filters/globalExceptionFilter';
import Plan from 'src/common/domains/plan/plan.domain';
import DBClient from 'src/providers/database/prisma/DB.client';
import PlanRepository from './plan.repository';
import { StatusValues } from 'src/common/constants/status.type';
import IPlan from 'src/common/domains/plan/plan.interface';
import { TripTypeValues } from 'src/common/constants/tripType.type';
import { ServiceAreaValues } from 'src/common/constants/serviceArea.type';
import UserRepository from '../user/user.repository';
import { IUser } from 'src/common/domains/user/user.interface';
import User from 'src/common/domains/user/user.domain';
import { RoleValues } from 'src/common/constants/role.type';
import AuthRepository from '../auth/auth.repository';
import { DreamerProfile, MakerProfile } from 'src/common/domains/user/profile.domain';
import { ProfileImage } from '@prisma/client';
import AuthService from '../auth/auth.service';
import UserService from '../user/user.service';

describe('PlanController (e2e)', () => {
  let app: INestApplication;

  let maker: IUser;
  let makerId = process.env.MAKER1_ID;
  let makerToken: string;

  let dreamer: IUser;
  let dreamerId = process.env.DREAMER1_ID;
  let dreamerToken: string;

  let plans: IPlan[];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true })).useGlobalFilters(new GlobalExceptionFilter());
    await app.init();

    console.log('NODE_ENV:', process.env.NODE_ENV);

    const prismaDB = app.get<DBClient>(DBClient);
    const authService = app.get<AuthService>(AuthService);
    console.log(process.env.EXAMPLE);
    // await prismaDB.seedForTestEnvironment();

    // makerToken = authService.createTokens({ userId: makerId, role: RoleValues.MAKER }).accessToken;
    // dreamerToken = authService.createTokens({ userId: dreamerId, role: RoleValues.DREAMER }).accessToken;
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await app.close();
  });

  describe('[GET /plans/dreamer]', () => {
    it('should get my plan List', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get('/plans/dreamer')
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(200);
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
      const { statusCode } = await request(app.getHttpServer())
        .get('/plans/maker')
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(200);
    });

    it('메이커의 토큰이 아니라면 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get('/plans/maker')
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(403);
    });
  });
});
