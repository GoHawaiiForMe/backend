import { Body, Controller, Delete, Post } from '@nestjs/common';
import FollowService from './follow.service';
import { User } from 'src/decorator/user.decorator';
import IFollowController from './interface/follow.controller.interface';

@Controller('follow')
export default class FollowController implements IFollowController {
  constructor(private readonly service: FollowService) {}

  @Post()
  async follow(@User() dreamerId: string, @Body('makerId') makerId: string): Promise<null> {
    return await this.service.create(dreamerId, makerId);
  }

  @Delete()
  async unfollow(@User() dreamerId: string, @Body('makerId') makerId: string): Promise<null> {
    return await this.service.delete(dreamerId, makerId);
  }
}
