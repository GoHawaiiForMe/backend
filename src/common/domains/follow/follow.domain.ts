import { UserReference } from 'src/common/types/user/user.types';
import { FollowProperties, FollowPropertiesWithMaker } from '../../types/follow/follow.types';
import IFollow from './follow.interface';

export default class Follow implements IFollow {
  private readonly id?: string;
  private readonly makerId: string;
  private readonly maker?: UserReference;
  private readonly dreamerId: string;
  private readonly isFollowed?: boolean;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;

  constructor(follow: FollowPropertiesWithMaker) {
    this.id = follow?.id;
    this.makerId = follow.makerId;
    this.maker = follow?.maker;
    this.dreamerId = follow.dreamerId;
    this.isFollowed = follow?.isFollowed;
    this.createdAt = follow?.createdAt;
    this.updatedAt = follow?.updatedAt;
  }

  static create(data: FollowProperties) {
    return new Follow(data);
  }

  getMakerId(): string {
    return this.makerId;
  }

  getMaker(): UserReference {
    return this.maker;
  }

  getId(): string {
    return this.id;
  }

  toDB() {
    return {
      id: this.id,
      makerId: this.makerId,
      dreamerId: this.dreamerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  toClient() {
    return {
      id: this.id,
      makerId: this.makerId,
      maker: this.maker,
      dreamerId: this.dreamerId,
      isFollowed: this.isFollowed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
