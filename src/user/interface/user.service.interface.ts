import User from '../domain/user.domain';
import { DreamerProfileProperties, MakerProfileProperties } from '../type/profile.types';
import { FilteredUserProperties, UserProperties } from '../type/user.types';

export interface IUserService {
  createUser(data): Promise<null>;
  login(email: string, password: string): Promise<FilteredUserProperties>;
  getUser(userId: string): Promise<FilteredUserProperties>;
  getProfile(role: string, userId: string): Promise<DreamerProfileProperties | MakerProfileProperties>;
  createToken(userId: string, type?: string): string;
  getPayload(refreshToken: string): string;
  updateUser(userId: string, data: Partial<UserProperties>): Promise<FilteredUserProperties>;
  updateDreamerProfile(userId: string, data: Partial<DreamerProfileProperties>): Promise<DreamerProfileProperties>;
  updateMakerProfile(userId: string, data: Partial<MakerProfileProperties>): Promise<MakerProfileProperties>;
}
