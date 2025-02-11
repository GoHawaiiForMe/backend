import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import PointLogService from './pointLog.service';
import { UserId } from 'src/common/decorators/user.decorator';
import { GetPointLogQueryDTO } from 'src/common/types/pointLog/pointLog.dto';
import { PointLogProperties } from 'src/common/types/pointLog/pointLog.type';

@Controller('coconuts')
export default class PointLogController {
  constructor(private readonly service: PointLogService) {}

  @Get()
  async get(@UserId() userId: string, @Query() options: GetPointLogQueryDTO): Promise<PointLogProperties[]> {
    return await this.service.get(userId, options);
  }
}
