import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserStats } from 'src/providers/database/mongoose/userStats.schema';

@Injectable()
export default class UserStatsRepository {
  constructor(@InjectModel(UserStats.name) private db: Model<UserStats>) {}
}
