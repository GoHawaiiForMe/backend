import { FollowProperties } from '../../types/follow/follow.types';
import IFollow from './follow.interface';

export default class Follow implements IFollow {
  private readonly id?: string;
  private makerId: string;
  private dreamerId: string;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;

  constructor(follow: FollowProperties) {
    this.id = follow?.id;
    this.makerId = follow.makerId;
    this.dreamerId = follow.dreamerId;
    this.createdAt = follow?.createdAt;
    this.updatedAt = follow?.updatedAt;
  }

  static create(data: FollowProperties) {
    return new Follow(data);
  }

  get() {
    return {
      id: this.id,
      makerId: this.makerId,
      dreamerId: this.dreamerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
