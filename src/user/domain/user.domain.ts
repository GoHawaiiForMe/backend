import { Role } from 'src/common/types/role.type';
import { FilteredUserProperties, UserProperties } from '../type/user.types';
import { ComparePassword, HashingPassword } from '../../common/utility/hashingPassword';
import { IUser } from './user.interface';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/enums/error.message';

export default class User implements IUser {
  private readonly id?: string;
  private readonly role: Role;
  private nickName: string;
  private readonly email: string;
  private password: string;
  private phoneNumber: string;
  private coconut: number;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;

  constructor(user: UserProperties) {
    this.id = user?.id;
    this.role = user.role;
    this.nickName = user.nickName;
    this.email = user.email;
    this.password = user.password;
    this.phoneNumber = user.phoneNumber;
    this.coconut = user.coconut;
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
    if (data.coconut < 0) {
      throw new BadRequestError(ErrorMessage.INVALID_COCONUT);
    }

    this.nickName = data.nickName || this.nickName;
    this.password = data.email || this.password;
    this.phoneNumber = data.phoneNumber || this.phoneNumber;
    this.coconut = data.coconut || this.coconut;

    return {
      nickName: this.nickName,
      password: this.password,
      phoneNumber: this.phoneNumber,
      coconut: this.coconut
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
      coconut: this.coconut,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  toClient(): FilteredUserProperties {
    return {
      id: this.id,
      role: this.role,
      nickName: this.nickName,
      coconut: this.coconut
    };
  }
}
