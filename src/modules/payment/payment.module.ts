import { Module } from '@nestjs/common';
import PaymentController from './payment.controller';
import PaymentService from './payment.service';
import PaymentRepository from './payment.repository';
import PaymentSchema, { Payment } from 'src/providers/database/mongoose/payment.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }])],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentRepository],
  exports: []
})
export default class PaymentModule {}
