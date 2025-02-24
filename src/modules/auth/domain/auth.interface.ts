import { Role } from 'src/common/constants/role.type';
import {
  FilteredAuthProperties,
  OAuthProperties,
  SignupProperties,
  AuthProperties
} from 'src/modules/auth/types/auth.types';

export interface IAuth {
  validatePassword(password: string): Promise<boolean>;
  get(): AuthProperties;
  toClient(): FilteredAuthProperties;
  toDB(): AuthProperties;
  signupData(): SignupProperties;
  OAuthData(): OAuthProperties;
  getId(): string;
  getRole(): Role | null;
  getNickName(): string;
}
