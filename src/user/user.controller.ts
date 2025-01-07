import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import UserService from './user.service';
import { Cookies } from 'src/decorator/cookie.decorator';
import { Public } from 'src/decorator/public.decorator';
import { User } from 'src/decorator/user.decorator';

@Controller('user')
export default class UserController {
  constructor(private readonly service: UserService) {}

  @Public()
  @Post('signup')
  async signup(@Body() data) {
    return await this.service.createUser(data);
  }

  @Public()
  @Post('login')
  async login(@Body() data, @Res() res): Promise<string> {
    const user = await this.service.login(data.email, data.password);
    const accessToken = this.service.createToken(user.id);
    const refreshToken = this.service.createToken(user.id, 'refresh');

    res.cookie('refreshToken', refreshToken, {
      path: '/user/token/refresh',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ accessToken });
  }

  @Get()
  async getUser(@User() userId: string) {
    return await this.service.getUser(userId);
  }

  @Get('profile/:role')
  async getProfile(@Param('role') role: string, @User() userId: string) {
    return await this.service.getProfile(role, userId);
  }

  @Patch('update')
  async updateUser(@Body() data, @User() userId: string) {
    return await this.service.updateUser(userId, data);
  }

  @Patch('update/profile/:role')
  async updateProfile(@Param('role') role: string, @Body() data, @User() userId: string) {
    if (role === 'DREAMER') {
      return await this.service.updateDreamerProfile(userId, data);
    } else {
      return await this.service.updateMakerProfile(userId, data);
    }
  }

  @Public()
  @Post('refresh/token')
  async getNewToken(@Cookies('refreshToken') refreshToken: string, @Res() res): Promise<string> {
    const userId = this.service.getPayload(refreshToken);
    const accessToken = this.service.createToken(userId);
    const newRefreshToken = this.service.createToken(userId, 'refresh');

    res.cookie('refreshToken', newRefreshToken, {
      path: '/user/token/refresh',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ accessToken });
  }
}
