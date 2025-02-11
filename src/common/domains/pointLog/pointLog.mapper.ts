import { PointLogProperties } from 'src/common/types/pointLog/pointLog.type';
import PointLog from './pointLog.domain';

export default class PointLogMapper {
  constructor(private readonly pointLog: PointLogProperties) {}

  toDomain() {
    return new PointLog({
      id: this.pointLog.id,
      userId: this.pointLog.userId,
      event: this.pointLog.event,
      value: this.pointLog.value,
      createdAt: this.pointLog.createdAt,
      updatedAt: this.pointLog.updatedAt
    });
  }
}
