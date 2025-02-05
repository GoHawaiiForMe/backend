import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SavePaymentDTO {
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @IsString()
  @IsNotEmpty()
  orderName: string;

  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsString()
  @IsNotEmpty()
  currency: string;
}
