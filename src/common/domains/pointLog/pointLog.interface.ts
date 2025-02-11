import { PointLogProperties } from 'src/common/types/pointLog/pointLog.type';

export default interface IPointLog {
  get(): PointLogProperties;
}
