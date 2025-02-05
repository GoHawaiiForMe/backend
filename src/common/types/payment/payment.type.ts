export interface PaymentProperties {
  id?: string;
  paymentId: string;
  userId: string;
  orderName: string;
  amount: number;
  method: string;
  currency: string;
  status: PaymentStatusEnum;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PaymentToClientProperties {
  id: string;
  amount: number;
  status: PaymentStatusEnum;
}

export enum PaymentStatusEnum {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  PAID = 'PAID'
}
