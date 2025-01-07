import { FollowProperties } from '../type/follow.types';
import IFollow from './follow.interface';

export default class Follow implements IFollow {
  readonly id?: string;
  makerId: string;
  dreamerId: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

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
