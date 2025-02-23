import { AuthPropertiesFromDB } from '../types/auth.types';
import User from './auth.domain';

export default class AuthMapper {
  constructor(private readonly user: AuthPropertiesFromDB) {}

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
      createdAt: this.user.createdAt,
      updatedAt: this.user.updatedAt
    });
  }
}
