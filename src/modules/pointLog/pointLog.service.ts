import { Injectable } from '@nestjs/common';
import PointLogRepository from './pointLog.repository';

@Injectable()
export default class PointLogService {
  constructor(private readonly repository: PointLogRepository) {}
}
