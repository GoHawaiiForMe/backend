import { PointEventEnum } from 'src/common/constants/pointEvent.type';
import { PointLogProperties } from 'src/common/types/pointLog/pointLog.type';
import IPointLog from './pointLog.interface';

export default class PointLog implements IPointLog {
  private readonly id?: string;
  private readonly userId: string;
  private readonly event: PointEventEnum;
  private readonly value: number;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;

  constructor(pointLog: PointLogProperties) {
    this.id = pointLog?.id;
    this.userId = pointLog.userId;
    this.event = pointLog.event;
    this.value = pointLog.value;
    this.createdAt = pointLog?.createdAt;
    this.updatedAt = pointLog?.updatedAt;
  }

  static create(data: PointLogProperties) {
    return new PointLog(data);
  }

  get(): PointLogProperties {
    return {
      id: this?.id,
      userId: this.userId,
      event: this.event,
      value: this.value,
      createdAt: this?.createdAt,
      updatedAt: this?.updatedAt
    };
  }
}
