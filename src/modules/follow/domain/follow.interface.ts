import { FollowProperties } from '../../../modules/follow/types/follow.types';

export default interface IFollow {
  getMakerId(): string;
  getId(): string;
  toObject(): FollowProperties;
}
