import { Injectable } from '@nestjs/common';
import { IAuth } from 'src/modules/auth/domain/auth.interface';
import AuthMapper from 'src/modules/auth/domain/auth.mapper';
import DBClient from 'src/providers/database/prisma/DB.client';
import { OAuthProperties, SignupProperties } from './types/auth.types';

@Injectable()
export default class AuthRepository {
  constructor(private readonly db: DBClient) {}

  async findByEmail(email: string): Promise<IAuth> {
    const data = await this.db.user.findUnique({ where: { email } });

    return new AuthMapper(data).toDomain();
  }

  async findByNickName(nickName: string): Promise<IAuth> {
    const data = await this.db.user.findUnique({ where: { nickName } });

    return new AuthMapper(data).toDomain();
  }

  async findById(id: string): Promise<IAuth> {
    const data = await this.db.user.findUnique({ where: { id } });

    return new AuthMapper(data).toDomain();
  }

  async findByProvider(providerData: OAuthProperties): Promise<IAuth> {
    const data = await this.db.user.findUnique({ where: { provider_providerId: providerData } });

    return new AuthMapper(data).toDomain();
  }

  async create(user: SignupProperties): Promise<IAuth> {
    const data = await this.db.user.create({ data: user });

    return new AuthMapper(data).toDomain();
  }
}
