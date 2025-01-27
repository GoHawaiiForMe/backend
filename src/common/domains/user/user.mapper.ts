import { UserPropertiesFromDB } from '../../types/user/user.types';
import User from './user.domain';

export default class UserMapper {
  constructor(private readonly user: UserPropertiesFromDB) {}

  toDomain() {
    if (!this.user) return null;

    return new User({
      id: this.user.id,
      role: this.user.role,
      nickName: this.user.nickName,
      email: this.user.email,
      password: this.user.password,
      phoneNumber: this.user.phoneNumber,
      coconut: this.user.coconut,
      followees: this.user?.followees,
      makerProfile: this.user?.makerProfile,
      createdAt: this.user.createdAt,
      updatedAt: this.user.updatedAt
    });
  } // 빈값의 객체가 나옴
}
