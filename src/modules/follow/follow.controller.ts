import { Body, Controller, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import FollowService from './follow.service';
import { UserId } from 'src/common/decorators/user.decorator';
import { Role } from 'src/common/decorators/roleGuard.decorator';

@Controller('follow')
@Role('DREAMER')
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
