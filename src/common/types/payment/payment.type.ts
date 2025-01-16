import { PaymentStatusEnum } from 'src/common/constants/paymentStatus.type';

export interface PaymentProperties {
  id?: string;
  userId: string;
  amount: number;
  status: PaymentStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaymentToClientProperties {
  id: string;
  amount: number;
  status: PaymentStatusEnum;
}
