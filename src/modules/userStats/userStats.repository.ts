import { Injectable } from '@nestjs/common';
import DBClient from 'src/providers/database/prisma/DB.client';

@Injectable()
export default class UserStatsRepository {
  constructor(private readonly db: DBClient) {}
}
