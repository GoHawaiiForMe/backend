import { PointEventEnum } from 'src/common/constants/pointEvent.type';

export interface PointLogProperties {
  id?: string;
  userId: string;
  event: PointEventEnum;
  value: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface QueryOptions {}
