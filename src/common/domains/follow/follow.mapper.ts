import { FollowProperties } from '../../types/follow/follow.types';
import Follow from './follow.domain';

export default class FollowMapper {
  constructor(private readonly follow: FollowProperties) {}

  toDomain() {
    if (!this.follow) return null;

    return new Follow({
      id: this.follow.id,
      makerId: this.follow.makerId,
      dreamerId: this.follow.dreamerId,
      createdAt: this.follow.createdAt,
      updatedAt: this.follow.updatedAt
    });
  }
}
