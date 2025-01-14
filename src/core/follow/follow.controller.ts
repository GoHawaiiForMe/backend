import { Body, Controller, Delete, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import FollowService from './follow.service';
import { UserId } from 'src/shared/decorator/user.decorator';

@Controller('follow')
export default class FollowController {
  constructor(private readonly service: FollowService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async follow(@UserId() dreamerId: string, @Body('makerId') makerId: string): Promise<null> {
    return await this.service.create(dreamerId, makerId);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfollow(@UserId() dreamerId: string, @Body('makerId') makerId: string): Promise<null> {
    return await this.service.delete(dreamerId, makerId);
  }
}
