import { Role } from 'src/common/constants/role.type';
import { FilteredUserProperties, PasswordProperties, UserProperties, UserPropertiesFromDB } from '../types/user.types';
import { ComparePassword, HashingPassword } from '../../../common/utilities/hashingPassword';
import { IUser } from './user.interface';
import BadRequestError from 'src/common/errors/badRequestError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { MakerInfoAndProfileProperties, MakerProfileProperties } from 'src/modules/profile/types/profile.types';
import { UserStatsProperties, UserStatsToClientProperties } from 'src/modules/userStats/types/userStats.types';
import { OAuthProvider } from 'src/common/constants/oauth.type';

export default class User implements IUser {
  private readonly id?: string;
  private role?: Role;
  private nickName?: string;
  private readonly email: string;
  private password?: string;
  private phoneNumber?: string;
  private coconut: number;
  private readonly provider: OAuthProvider;
  private readonly providerId: string;
  private readonly followers: { dreamerId: string }[];
  private readonly makerProfile: Partial<MakerProfileProperties>;
  private readonly stats: UserStatsProperties;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;

  constructor(user: UserPropertiesFromDB) {
    this.id = user?.id;
    this.role = user?.role;
    this.nickName = user?.nickName;
    this.email = user.email;
    this.password = user?.password;
    this.phoneNumber = user?.phoneNumber;
    this.coconut = user.coconut ?? 0;
    this.provider = user?.provider;
    this.providerId = user?.providerId;
    this.followers = user?.followers;
    this.makerProfile = user?.makerProfile;
    this.stats = user?.stats;
    this.createdAt = user?.createdAt;
    this.updatedAt = user?.updatedAt;
  }

  async validatePassword(password: string): Promise<boolean> {
    return ComparePassword(password, this.password);
  }

  async update(data: Partial<UserProperties> & PasswordProperties): Promise<FilteredUserProperties> {
    if (data.password) {
      await this.updatePassword({
        password: data.password,
        newPassword: data.newPassword
      });
    }

    this.nickName = data.nickName || this.nickName;
    this.phoneNumber = data.phoneNumber || this.phoneNumber;
    if (data.coconut) {
      this.coconut += data.coconut;
    }

    return this.toClient();
  }

  async updatePassword(data: PasswordProperties): Promise<void> {
    const isCorrectPassword = await this.validatePassword(data.password);
    if (!isCorrectPassword) {
      throw new BadRequestError(ErrorMessage.USER_BAD_REQUEST_PW);
    }

    this.password = await HashingPassword(data.newPassword);
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

  toClientAll(): Omit<UserProperties, 'password'> {
    return {
      id: this.id,
      role: this.role,
      nickName: this.nickName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      coconut: this.coconut
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

  toDB(): UserProperties {
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

  getId(): string {
    return this.id;
  }

  getRole(): Role | null {
    return this.role ?? null;
  }

  getNickName(): string {
    return this.nickName;
  }

  isFollowed(dreamerId: string): boolean {
    return this.followers?.some((follower) => follower.dreamerId === dreamerId);
  }

  getWithMakerProfile(withDetails?: boolean): Partial<MakerInfoAndProfileProperties> {
    const profile = {
      id: this.id,
      nickName: this.nickName,
      image: this.makerProfile.image,
      gallery: this.makerProfile.gallery,
      serviceTypes: this.makerProfile.serviceTypes
    };

    if (withDetails) {
      return {
        ...profile,
        serviceArea: this.makerProfile.serviceArea,
        description: this.makerProfile.description,
        detailDescription: this.makerProfile.detailDescription
      };
    }
    return profile;
  }

  getStats(): UserStatsToClientProperties {
    return {
      averageRating: this.stats?.averageRating ?? 0,
      totalReviews: this.stats?.totalReviews ?? 0,
      totalFollows: this.stats?.totalFollows ?? 0,
      totalConfirms: this.stats?.totalConfirms ?? 0
    };
  }
}
