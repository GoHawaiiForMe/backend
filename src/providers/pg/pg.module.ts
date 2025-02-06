import { DynamicModule, Module } from '@nestjs/common';
import { PGService } from './pg.service';
import { PaymentClient } from '@portone/server-sdk';

@Module({})
export class PGModule {
  static register(): DynamicModule {
    return {
      module: PGModule,
      providers: [
        {
          provide: 'PAYMENT_CLIENT',
          useFactory: () => {
            return PaymentClient({
              secret: process.env.V2_API_SECRET
            });
          }
        },
        PGService
      ],
      exports: ['PAYMENT_CLIENT', PGService]
    };
  }
}
