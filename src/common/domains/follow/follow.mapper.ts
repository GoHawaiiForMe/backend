import { FollowPropertiesFromDB } from '../../types/follow/follow.types';
import Follow from './follow.domain';

export default class FollowMapper {
  constructor(private readonly follow: FollowPropertiesFromDB) {}

  toDomain() {
    const isFollowed = this.follow.maker.followers.length > 0 ? true : false;

    return new Follow({
      id: this.follow.id,
      makerId: this.follow.makerId,
      maker: {
        nickName: this.follow?.maker?.nickName,
        image: this.follow?.maker?.makerProfile.image,
        gallery: this.follow?.maker?.makerProfile.gallery
      },
      isFollowed,
      dreamerId: this.follow.dreamerId,
      createdAt: this.follow.createdAt,
      updatedAt: this.follow.updatedAt
    });
  }
}
