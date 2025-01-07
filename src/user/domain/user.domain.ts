import { Role } from 'src/common/types/role.type';
import { FilteredUserProperties, UserProperties } from '../type/user.types';
import { ComparePassword, HashingPassword } from '../../common/utility/hashingPassword';
import { IUser } from './user.interface';

export default class User implements IUser {
  private readonly id?: string;
  private readonly role: Role;
  private nickName: string;
  private readonly email: string;
  private password: string;
  private phoneNumber: string;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;

  constructor(user: UserProperties) {
    this.id = user?.id;
    this.role = user.role;
    this.nickName = user.nickName;
    this.email = user.email;
    this.password = user.password;
    this.phoneNumber = user.phoneNumber;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
  }

  static async create(data) {
    const hashedPassword = await HashingPassword(data.password);
    return new User({ ...data, password: hashedPassword });
  }

  async validatePassword(password: string): Promise<boolean> {
    return ComparePassword(password, this.password);
  }

  update(data: Partial<UserProperties>): Partial<UserProperties> {
    this.nickName = data.nickName || this.nickName;
    this.password = data.email || this.password;
    this.phoneNumber = data.phoneNumber || this.phoneNumber;

    return {
      nickName: this.nickName,
      password: this.password,
      phoneNumber: this.phoneNumber
    };
  }

  get(): UserProperties {
    return {
      id: this.id,
      role: this.role,
      nickName: this.nickName,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  toClient(): FilteredUserProperties {
    return {
      id: this.id,
      role: this.role,
      nickName: this.nickName
    };
  }
}
