import { mapToRole } from 'src/common/utilities/mapToEnum';
import { UserMapperProperties, UserProperties } from '../../types/user/user.types';
import User from './user.domain';

export default class UserMapper {
  constructor(private readonly user: UserMapperProperties) {}

  toDomain() {
    if (!this.user) return null;

    return new User({
      id: this.user.id,
      role: mapToRole(this.user.role),
      nickName: this.user.nickName,
      email: this.user.email,
      password: this.user.password,
      phoneNumber: this.user.phoneNumber,
      coconut: this.user.coconut,
      createdAt: this.user.createdAt,
      updatedAt: this.user.updatedAt
    });
  } // 빈값의 객체가 나옴
}
