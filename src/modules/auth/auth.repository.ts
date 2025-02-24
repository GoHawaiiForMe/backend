import { Injectable } from '@nestjs/common';
import { IUser } from 'src/modules/user/domain/user.interface';
import UserMapper from 'src/modules/user/domain/user.mapper';
import { OAuthProperties, SignupProperties } from 'src/modules/user/types/user.types';
import DBClient from 'src/providers/database/prisma/DB.client';

@Injectable()
export default class AuthRepository {
  constructor(private readonly db: DBClient) {}

  async findByEmail(email: string): Promise<IUser> {
    const data = await this.db.user.findUnique({ where: { email } });

    return new UserMapper(data).toDomain();
  }

  async findByNickName(nickName: string): Promise<IUser> {
    const data = await this.db.user.findUnique({ where: { nickName } });

    return new UserMapper(data).toDomain();
  }

  async findById(id: string): Promise<IUser> {
    const data = await this.db.user.findUnique({ where: { id } });

    return new UserMapper(data).toDomain();
  }

  async findByProvider(providerData: OAuthProperties): Promise<IUser> {
    const data = await this.db.user.findUnique({ where: { provider_providerId: providerData } });

    return new UserMapper(data).toDomain();
  }

  async create(user: SignupProperties): Promise<IUser> {
    const data = await this.db.user.create({ data: user });

    return new UserMapper(data).toDomain();
  }
}
