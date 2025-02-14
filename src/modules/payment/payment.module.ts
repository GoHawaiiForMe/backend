import { Module } from '@nestjs/common';
import PaymentController from './payment.controller';
import PaymentService from './payment.service';
import PaymentRepository from './payment.repository';
import PaymentSchema, { Payment } from 'src/providers/database/mongoose/payment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { PGModule } from 'src/providers/pg/pg.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'points'
    }),
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
    PGModule.register()
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
  exports: []
})
export default class PaymentModule {}
