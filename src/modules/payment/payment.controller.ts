import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import PaymentService from './payment.service';
import { UserId } from 'src/common/decorators/user.decorator';
import { PaymentToClientProperties } from 'src/common/types/payment/payment.type';
import { SavePaymentDTO } from 'src/common/types/payment/payment.dto';

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
  async savePayment(@UserId() userId: string, @Body() body: SavePaymentDTO): Promise<PaymentToClientProperties> {
    return await this.service.create(userId, body);
  }

  @Post('complete')
  async completePayment(@Body() body: { paymentId: string }): Promise<PaymentToClientProperties> {
    return await this.service.syncPayment(body.paymentId);
  }
}
