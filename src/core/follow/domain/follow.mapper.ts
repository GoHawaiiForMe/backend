import { FollowProperties } from '../type/follow.types';
import Follow from './follow.domain';

export default class FollowMapper {
  constructor(private readonly follow: FollowProperties) {}

  toDomain() {
    return new Follow({
      id: this.follow.id,
      makerId: this.follow.makerId,
      dreamerId: this.follow.dreamerId,
      createdAt: this.follow.createdAt,
      updatedAt: this.follow.updatedAt
    });
  }
}
