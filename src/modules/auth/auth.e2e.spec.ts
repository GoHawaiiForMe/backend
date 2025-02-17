import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import AppModule from 'src/app.module';
import GlobalExceptionFilter from 'src/common/filters/globalExceptionFilter';
import DBClient from 'src/providers/database/prisma/DB.client';
import { RoleValues } from 'src/common/constants/role.type';
import AuthService from '../auth/auth.service';
import { OAuthProviderValues } from 'src/common/constants/oauth.type';
import { ProfileImageValues } from 'src/common/constants/image.type';
import { TripTypeValues } from 'src/common/constants/tripType.type';
import { ServiceAreaValues } from 'src/common/constants/serviceArea.type';
import cookieParser from 'cookie-parser';

describe('Auth Test (e2e)', () => {
  let app: INestApplication;

  const existId = process.env.DREAMER1_ID;
  const existEmail = process.env.DREAMER1_EMAIL;
  const existNickName = process.env.DREAMER1_NICKNAME;
  const existPassword = process.env.DREAMER1_PASSWORD;

  let refreshToken: string;
  let googleToken: string;
  let googleToken2: string;

  jest.setTimeout(100000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true })).useGlobalFilters(new GlobalExceptionFilter());
    app.use(cookieParser());
    await app.init();

    const prismaDB = app.get<DBClient>(DBClient);
    const authService = app.get<AuthService>(AuthService);

    await prismaDB.seedForTestEnvironment();
    refreshToken = authService.createTokens({ userId: existId, role: RoleValues.DREAMER }).refreshToken;
    googleToken = authService.createOAuthToken({ provider: OAuthProviderValues.GOOGLE, providerId: '1' }).OAuthToken;
    googleToken2 = authService.createOAuthToken({
      provider: OAuthProviderValues.GOOGLE,
      providerId: process.env.OAUTH_GOOGLE_PROVIDER_ID
    }).OAuthToken;
  });

  afterAll(async () => {
    const prismaDB = app.get<DBClient>(DBClient);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await prismaDB.$disconnect();
    await app.close();
  });

  describe('[POST /auth/signup]', () => {
    let email = 'e2e@test.com';
    let nickName = '1';
    const dto = {
      user: {
        role: RoleValues.DREAMER,
        nickName,
        email,
        password: '123456789',
        phoneNumber: '01012345678'
      },
      profile: {
        image: ProfileImageValues.DEFAULT_1,
        tripTypes: [TripTypeValues.ACTIVITY],
        serviceArea: [ServiceAreaValues.SEOUL]
      }
    };
    const socialDto = {
      user: {
        role: RoleValues.DREAMER,
        nickName: '2',
        phoneNumber: '01012345678'
      },
      profile: {
        image: ProfileImageValues.DEFAULT_1,
        tripTypes: [TripTypeValues.ACTIVITY],
        serviceArea: [ServiceAreaValues.SEOUL]
      }
    };

    it('새로운 유저 생성', async () => {
      const { statusCode } = await request(app.getHttpServer()).post('/auth/signup').send(dto);

      expect(statusCode).toBe(HttpStatus.CREATED);
    });

    it('새로운 유저 생성, 새로운 소셜 로그인 유저 생성', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post('/auth/signup')
        .set('authorization', `Bearer ${googleToken}`)
        .send(socialDto);

      expect(statusCode).toBe(HttpStatus.CREATED);
    });

    it('새로운 유저 생성, 기존 소셜 로그인 유저인 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(socialDto)
        .set('authorization', `Bearer ${googleToken2}`);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('새로운 유저 생성, 이메일이 중복인 경우 400에러', async () => {
      email = existEmail;
      const { statusCode } = await request(app.getHttpServer()).post('/auth/signup').send(dto);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('새로운 유저 생성, 닉네임이 중복인 경우 400에러', async () => {
      email = 'e2e@test.com';
      nickName = existNickName;
      const { statusCode } = await request(app.getHttpServer()).post('/auth/signup').send(dto);

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('[POST /auth/login]', () => {
    const dto = { email: existEmail, password: existPassword };

    it('유저 로그인 요청', async () => {
      const { body, statusCode } = await request(app.getHttpServer()).post('/auth/login').send(dto);

      expect(statusCode).toBe(HttpStatus.CREATED);
      expect(body).toBeDefined();
    });

    it('유저 로그인 요청, 존재하지 않는 ID인 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ ...dto, email: 'wrong' });

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });

    it('유저 로그인 요청, 잘못된 비밀번호인 경우 400에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ ...dto, password: 'wrong' });

      expect(statusCode).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('[GET /auth/google]', () => {
    it('구글 로그인 리다이렉트 주소를 반환', async () => {
      const { body, statusCode } = await request(app.getHttpServer()).get('/auth/google');

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });
  });

  describe('[GET /auth/kakao]', () => {
    it('카카오 로그인 리다이렉트 주소를 반환', async () => {
      const { body, statusCode } = await request(app.getHttpServer()).get('/auth/kakao');

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });
  });

  describe('[GET /auth/naver]', () => {
    it('네이버 로그인 리다이렉트 주소를 반환', async () => {
      const { body, statusCode } = await request(app.getHttpServer()).get('/auth/naver');

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });
  });

  describe('[POST /auth/refresh/token]', () => {
    it('리프레시토큰을 통해 토큰 재발급', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post('/auth/refresh/token')
        .set('Cookie', [`refreshToken=${refreshToken}`]);

      expect(statusCode).toBe(HttpStatus.CREATED);
      expect(body).toBeDefined();
    });

    it('리프레시토큰을 통해 토큰 재발급, 토큰이 없는 경우 401에러', async () => {
      const { statusCode } = await request(app.getHttpServer()).post(`/auth/refresh/token`);

      expect(statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('리프레시토큰을 통해 토큰 재발급, 토큰이 유효하지 않은 경우 401에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post(`/auth/refresh/token`)
        .set('Cookie', `refreshToken=111`);

      expect(statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('[POST /auth/check/email]', () => {
    it('이메일 중복 검사', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post(`/auth/check/email`)
        .send({ email: '1@test.com' });

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeTruthy();
    });
  });

  describe('[POST /auth/check/nickname]', () => {
    it('닉네임 중복 검사', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post(`/auth/check/nickname`)
        .send({ nickName: '0' });

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeTruthy();
    });
  });
});
