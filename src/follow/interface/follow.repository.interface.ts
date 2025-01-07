import IFollow from '../domain/follow.interface';
import { FollowProperties } from '../type/follow.types';

export default interface IFollowRepository {
  find(dreamerId: string, makerId: string): Promise<IFollow[]>;
  create(data: Partial<FollowProperties>): Promise<null>;
  delete(id: string): Promise<null>;
}
