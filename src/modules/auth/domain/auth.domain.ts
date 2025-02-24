import { Role } from 'src/common/constants/role.type';
import {
  FilteredAuthProperties,
  OAuthProperties,
  SignupProperties,
  AuthProperties,
  AuthPropertiesFromDB
} from '../types/auth.types';
import { ComparePassword, HashingPassword } from '../../../common/utilities/hashingPassword';
import { IAuth } from './auth.interface';
import { OAuthProvider } from 'src/common/constants/oauth.type';

export default class Auth implements IAuth {
  private readonly id?: string;
  private role?: Role;
  private nickName?: string;
  private readonly email: string;
  private password?: string;
  private phoneNumber?: string;
  private coconut: number;
  private readonly provider: OAuthProvider;
  private readonly providerId: string;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;

  constructor(user: AuthPropertiesFromDB) {
    this.id = user?.id;
    this.role = user?.role;
    this.nickName = user?.nickName;
    this.email = user.email;
    this.password = user?.password;
    this.phoneNumber = user?.phoneNumber;
    this.coconut = user.coconut ?? 0;
    this.provider = user?.provider;
    this.providerId = user?.providerId;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
  }
  async validatePassword(password: string): Promise<boolean> {
    return ComparePassword(password, this.password);
  }

  static async create(data: AuthPropertiesFromDB): Promise<IAuth> {
    let hashedPassword: string | null = null;
    if (data.password) {
      hashedPassword = await HashingPassword(data.password);
    }
    return new Auth({ ...data, password: hashedPassword });
  }

  get(): AuthProperties {
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

  toClientAll(): Omit<AuthProperties, 'password'> {
    return {
      id: this.id,
      role: this.role,
      nickName: this.nickName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      coconut: this.coconut
    };
  }

  toClient(): FilteredAuthProperties {
    return {
      id: this.id,
      role: this.role,
      nickName: this.nickName,
      coconut: this.coconut
    };
  }

  toDB(): AuthProperties {
    return {
      id: this.id,
      role: this.role,
      nickName: this.nickName,
      email: this.email,
      password: this.password,
      phoneNumber: this.phoneNumber,
      coconut: this.coconut
    };
  }

  signupData(): SignupProperties {
    return {
      role: this.role,
      email: this?.email,
      nickName: this.nickName,
      password: this?.password,
      phoneNumber: this.phoneNumber,
      provider: this?.provider,
      providerId: this?.providerId
    };
  }

  OAuthData(): OAuthProperties {
    return {
      provider: this.provider,
      providerId: this.providerId
    };
  }

  getId(): string {
    return this.id;
  }

  getRole(): Role | null {
    return this.role ?? null;
  }

  getNickName(): string {
    return this.nickName;
  }
}
