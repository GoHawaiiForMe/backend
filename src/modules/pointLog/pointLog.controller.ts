import { Controller, Get } from '@nestjs/common';
import PointLogService from './pointLog.service';

@Controller('coconuts')
export default class PointLogController {
  constructor(private readonly service: PointLogService) {}

  @Get()
  async get() {}
}
