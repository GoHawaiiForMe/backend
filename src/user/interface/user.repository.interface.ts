import { IDreamerProfile, IMakerProfile } from '../domain/profile.interface';
import { IUser } from '../domain/user.interface';
import { DreamerProfileProperties, MakerProfileProperties } from '../type/profile.types';
import { UserProperties } from '../type/user.types';

export default interface IUserRepository {
  findByEmail(email: string): Promise<IUser>;
  findByNickName(nickName: string): Promise<IUser>;
  findById(id: string): Promise<IUser>;
  create(user: Partial<UserProperties>): Promise<IUser>;
  update(id: string, data: Partial<UserProperties>): Promise<null>;
  createDreamer(user: Partial<DreamerProfileProperties>): Promise<IDreamerProfile>;
  createMaker(user: Partial<MakerProfileProperties>): Promise<IMakerProfile>;
  findDreamerProfile(userId: string): Promise<IDreamerProfile>;
  findMakerProfile(userId: string): Promise<IMakerProfile>;
  updateDreamerProfile(userId: string, data: Partial<DreamerProfileProperties>): Promise<null>;
  updateMakerProfile(userId: string, data: Partial<MakerProfileProperties>): Promise<void>;
}
