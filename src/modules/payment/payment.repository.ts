import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPayment } from './domain/payment.interface';
import PaymentMapper from './domain/payment.mapper';
import { PaymentProperties } from 'src/modules/payment/types/payment.type';
import { Payment } from 'src/providers/database/mongoose/payment.schema';

@Injectable()
export default class PaymentRepository {
  constructor(@InjectModel(Payment.name) private payment: Model<Payment>) {}

  async findById(id: string): Promise<IPayment> {
    const data = await this.payment.findById(id).exec();
    const payment = { ...data.toObject(), id: data._id.toString() };

    return new PaymentMapper(payment).toDomain();
  }

  async create(data: PaymentProperties): Promise<IPayment> {
    const payment = await this.payment.create(data);

    return new PaymentMapper(payment).toDomain();
  }

  async update(data: IPayment) {
    const payment = await this.payment.findByIdAndUpdate(data.getId(), { $set: data.toDB() }, { new: true });

    return new PaymentMapper(payment).toDomain();
  }
}
