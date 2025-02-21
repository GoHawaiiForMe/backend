import { FollowProperties } from '../../../modules/follow/types/follow.types';
import IFollow from './follow.interface';

export default class Follow implements IFollow {
  private readonly id?: string;
  private readonly makerId: string;
  private readonly dreamerId: string;
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

  getMakerId(): string {
    return this.makerId;
  }

  getId(): string {
    return this.id;
  }

  toObject() {
    return {
      id: this.id,
      makerId: this.makerId,
      dreamerId: this.dreamerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
