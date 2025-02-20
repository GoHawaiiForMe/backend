import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import AppModule from 'src/app.module';
import GlobalExceptionFilter from 'src/common/filters/globalExceptionFilter';
import { RoleValues } from 'src/common/constants/role.type';
import AuthService from '../auth/auth.service';
import { mongooseSeed } from 'src/providers/database/mongoose/mongoose.seed';
import PaymentService from './payment.service';
import { PaymentStatusEnum } from 'src/common/types/payment/payment.type';

describe('Payment Test (e2e)', () => {
  let app: INestApplication;
  let paymentService: PaymentService;

  const dreamerId1 = process.env.DREAMER1_ID;
  const dreamerId2 = process.env.DREAMER2_ID;
  const paymentId = process.env.PAYMENT_ID;

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

    const authService = app.get<AuthService>(AuthService);
    paymentService = app.get<PaymentService>(PaymentService);
    await mongooseSeed();

    dreamerToken1 = authService.createTokens({ userId: dreamerId1, role: RoleValues.DREAMER }).accessToken;
    dreamerToken2 = authService.createTokens({ userId: dreamerId2, role: RoleValues.DREAMER }).accessToken;
  });

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await app.close();
  });

  describe('[GET /payments/{paymentId}]', () => {
    it('결제 상태 조회', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .get(`/payments/${paymentId}`)
        .set('authorization', `Bearer ${dreamerToken1}`);

      expect(statusCode).toBe(HttpStatus.OK);
      expect(body).toBeDefined();
    });

    it('결제 상태 조회, 본인의 결제가 아닐 경우 401에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .get(`/payments/${paymentId}`)
        .set('authorization', `Bearer ${dreamerToken2}`);

      expect(statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });
  });

  describe('[POST /payments]', () => {
    const dto = {
      paymentId: '1',
      orderName: 'test',
      amount: 10,
      method: 'CARD',
      currency: 'KRW'
    };

    it('결제 데이터 저장', async () => {
      const { body, statusCode } = await request(app.getHttpServer())
        .post(`/payments`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.CREATED);
      expect(body).toBeDefined();
    });
  });

  describe('[POST /payments/complete]', () => {
    const dto = { paymentId };
    const wrongDto = { paymentId: '67918968c27c4c4cfe5c47fe' };

    it('결제 완료', async () => {
      jest
        .spyOn(paymentService['pg'], 'getPayment')
        .mockResolvedValue({ status: PaymentStatusEnum.PAID, amount: { total: 1000 } } as any);

      const { body, statusCode } = await request(app.getHttpServer())
        .post(`/payments/complete`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.CREATED);
      expect(body).toBeDefined();
    });

    it('결제 완료, 결제 데이터가 없는 경우 404에러', async () => {
      const { statusCode } = await request(app.getHttpServer())
        .post(`/payments/complete`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send(wrongDto);

      expect(statusCode).toBe(HttpStatus.NOT_FOUND);
    });

    it('결제 완료, PG사 결제 상태가 PAID가 아닌 경우 409에러', async () => {
      jest
        .spyOn(paymentService['pg'], 'getPayment')
        .mockResolvedValue({ status: PaymentStatusEnum.PENDING, amount: { total: 1000 } } as any);

      const { statusCode } = await request(app.getHttpServer())
        .post(`/payments/complete`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.CONFLICT);
    });

    it('결제 완료, 결제 금액이 불일치할 경우 409에러', async () => {
      jest.spyOn(paymentService['pg'], 'cancelPayment').mockResolvedValue(undefined);

      jest
        .spyOn(paymentService['pg'], 'getPayment')
        .mockResolvedValue({ status: PaymentStatusEnum.PAID, amount: { total: 2000 } } as any);

      const { statusCode } = await request(app.getHttpServer())
        .post(`/payments/complete`)
        .set('authorization', `Bearer ${dreamerToken1}`)
        .send(dto);

      expect(statusCode).toBe(HttpStatus.CONFLICT);
    });
  });
});
