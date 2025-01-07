import { UserProperties } from '../type/user.types';
import User from './user.domain';

export default class UserMapper {
  constructor(private readonly user: UserProperties) {}

  toDomain() {
    return new User({
      id: this.user.id,
      role: this.user.role,
      nickName: this.user.nickName,
      email: this.user.email,
      password: this.user.password,
      phoneNumber: this.user.phoneNumber,
      createdAt: this.user.createdAt,
      updatedAt: this.user.updatedAt
    });
  }
}
