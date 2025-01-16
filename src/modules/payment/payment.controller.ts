import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import PaymentService from './payment.service';
import { UserId } from 'src/common/decorators/user.decorator';
import { PaymentToClientProperties } from 'src/common/types/payment/payment.type';

@Controller('payments')
export default class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Get(':paymentId')
  async getPayment(
    @UserId() userId: string,
    @Param('paymentId') paymentId: string
  ): Promise<PaymentToClientProperties> {
    return await this.service.get(userId, paymentId);
  }

  @Post()
  async savePayment(@UserId() userId: string, @Body() body: { amount: number }): Promise<PaymentToClientProperties> {
    return await this.service.create(userId, body);
  }

  // TODO: 결제 완료 API
}
