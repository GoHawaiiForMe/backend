import { FollowProperties } from '../../types/follow/follow.types';

export default interface IFollow {
  getMakerId(): string;
  getId(): string;
  toObject(): FollowProperties;
}
