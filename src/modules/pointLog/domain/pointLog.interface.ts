import { PointLogProperties } from 'src/modules/pointLog/types/pointLog.type';

export default interface IPointLog {
  get(): PointLogProperties;
}
