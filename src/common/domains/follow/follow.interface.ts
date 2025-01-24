import { UserReference } from 'src/common/types/user/user.types';
import { FollowProperties, FollowPropertiesWithMaker } from '../../types/follow/follow.types';

export default interface IFollow {
  getMakerId(): string;
  getMaker(): UserReference;
  toDB(): FollowProperties;
  toClient(): FollowPropertiesWithMaker;
}
