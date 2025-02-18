import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import AppModule from 'src/app.module';
import GlobalExceptionFilter from 'src/common/filters/globalExceptionFilter';
import DBClient from 'src/providers/database/prisma/DB.client';
import { RoleValues } from 'src/common/constants/role.type';
import AuthService from '../auth/auth.service';
import { ProfileImageValues } from 'src/common/constants/image.type';

describe('Review Test (e2e)', () => {
  let app: INestApplication;

  const makerId = process.env.MAKER1_ID;
  const dreamerId = process.env.DREAMER1_ID;
  const dreamerPassword = process.env.DREAMER1_PASSWORD;
  const dreamerNickName = process.env.DREAMER1_NICKNAME;

  let makerToken: string;
  let dreamerToken: string;
  let noUserToken: string;

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
    noUserToken = authService.createTokens({ userId: 'null', role: RoleValues.MAKER }).accessToken;
  });

  afterAll(async () => {
    const prismaDB = app.get<DBClient>(DBClient);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await prismaDB.$disconnect();
    await app.close();
  });

  describe('[GET /users/me]', () => {
    const dto = { makerId };

    it('나의 기본 정보 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/users/me')
        .set('authorization', `Bearer ${dreamerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });
  });

  describe('[GET /users/profile]', () => {
    it('DREAMER의 프로필 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/users/profile')
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('MAKER의 프로필 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/users/profile')
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });
  });

  describe('[GET /users/profile/{makerId}]', () => {
    it('메이커 정보 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get(`/users/profile/${makerId}`)
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('메이커 정보 조회, 존재하지 않는 MAKER인 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer()).get(`/users/profile/1`);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('[GET /users/following]', () => {
    it('나의 찜한 메이커 목록 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/users/following')
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('나의 찜한 메이커 목록 조회, DREAMER가 아닌 경우 403에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get('/users/following')
        .set('authorization', `Bearer ${makerToken}`);

      expect(statusCode).toBe(HttpStatus.FORBIDDEN);
    });
  });

  describe('[GET /users/makers]', () => {
    it('메이커 목록 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/users/makers')
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('메이커 목록 조회-평점 높은순 정렬', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get('/users/makers?orderBy=RATINGS')
        .set('authorization', `Bearer ${dreamerToken}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('메이커 목록 조회, 잘못된 ServiceArea인 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer()).get('/users/makers?serviceType=KOREA');

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('[PATCH /users/update]', () => {
    const dto = { password: dreamerPassword, newPassword: '123456789' };
    const nickNameDto = { nickName: dreamerNickName };
    const wrongDto = { ...dto, password: '1' };

    it('나의 정보 수정', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch('/users/update')
        .set('authorization', `Bearer ${dreamerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('나의 정보 수정, 비밀번호가 불일치한 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch('/users/update')
        .set('authorization', `Bearer ${dreamerToken}`)
        .send(wrongDto);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('나의 정보 수정, 이미 존재하는 닉네임인 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch('/users/update')
        .set('authorization', `Bearer ${makerToken}`)
        .send(nickNameDto);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('나의 정보 수정, 유저 정보가 없는 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .patch('/users/update')
        .set('authorization', `Bearer ${noUserToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('[PATCH /users/update/profile]', () => {
    const dto = { image: ProfileImageValues.DEFAULT_4 };

    it('나의 프로필 수정-DREAMER', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch('/users/update/profile')
        .set('authorization', `Bearer ${dreamerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('나의 프로필 수정-MAKER', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch('/users/update/profile')
        .set('authorization', `Bearer ${makerToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('나의 프로필 수정-DREAMER, 유저 프로필이 없는 경우 400에러', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .patch('/users/update/profile')
        .set('authorization', `Bearer ${noUserToken}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(body).toBeDefined();
    });
  });
});
