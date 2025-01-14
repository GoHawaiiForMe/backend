import { Body, Controller, Get, Patch, Post, Res } from '@nestjs/common';
import UserService from './user.service';
import { Cookies } from 'src/shared/decorator/cookie.decorator';
import { Public } from 'src/shared/decorator/public.decorator';
import { UserId } from 'src/shared/decorator/user.decorator';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import LoginDTO from './type/login.dto';
import { Response } from 'express';
import SignupDTO from './type/signup.dto';
import {
  DreamerProfileResponseDTO,
  FilteredUserResponseDTO,
  MakerProfileResponseDTO,
  UserResponseDTO
} from './type/user.response.dto';
import UpdateProfileDTO from './type/updateProfile.dto';
import { DreamerProfileProperties, MakerProfileProperties } from './type/profile.types';
import { FilteredUserProperties, UserProperties } from './type/user.types';
import UpdateUserDTO from './type/updateUser.dto';
import UnauthorizedError from 'src/common/errors/unauthorizedError';
import ErrorMessage from 'src/common/enums/error.message';
import { UserRole } from 'src/shared/decorator/role.decorator';

@Controller('user')
export default class UserController {
  constructor(private readonly service: UserService) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: '회원가입', description: '유저 정보와 프로필을 통해 새로운 유저를 생성합니다' })
  @ApiBody({ type: SignupDTO })
  @ApiCreatedResponse({ description: '회원가입 성공' })
  @ApiBadRequestResponse({ description: '이미 존재하는 닉네임 또는 이메일입니다' })
  async signup(@Body() data: SignupDTO) {
    return await this.service.createUser(data);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: '로그인', description: '이메일과 비밀번호로 유저 로그인 요청을 보냅니다' })
  @ApiBody({ type: LoginDTO })
  @ApiCreatedResponse({ description: '{ accessToken }' })
  @ApiBadRequestResponse({ description: '이메일 또는 비밀번호가 유저 정보와 일치하지 않습니다' })
  async login(@Body() data: LoginDTO, @Res() res: Response): Promise<void> {
    const user = await this.service.login(data.email, data.password);
    const tokenPayload = { userId: user.id, role: user.role };
    const { accessToken, refreshToken } = this.service.createTokens(tokenPayload);

    res.cookie('refreshToken', refreshToken, {
      path: '/user/token/refresh',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
  }

  @Get()
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '유저 정보 조회', description: '로그인한 유저의 기본 정보를 조회합니다' })
  @ApiOkResponse({ type: UserResponseDTO })
  @ApiUnauthorizedResponse({ description: 'Access Token이 없거나 만료되었습니다' })
  async getUser(@UserId() userId: string): Promise<Omit<UserProperties, 'password'>> {
    return await this.service.getUser(userId);
  }

  @Get('profile')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '프로필 정보 조회', description: '로그인한 유저의 프로필을 조회합니다' })
  @ApiOkResponse({ type: MakerProfileResponseDTO || DreamerProfileResponseDTO })
  @ApiUnauthorizedResponse({ description: 'Access Token이 없거나 만료되었습니다' })
  async getProfile(
    @UserRole() role: string,
    @UserId() userId: string
  ): Promise<MakerProfileProperties | DreamerProfileProperties> {
    return await this.service.getProfile(role, userId);
  }

  @Patch('update')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '유저 정보 수정', description: '로그인한 유저의 기본 정보를 수정합니다' })
  @ApiBody({ type: UpdateUserDTO })
  @ApiOkResponse({ type: FilteredUserResponseDTO })
  @ApiUnauthorizedResponse({ description: 'Access Token이 없거나 만료되었습니다' })
  async updateUser(@Body() data: UpdateUserDTO, @UserId() userId: string): Promise<FilteredUserProperties> {
    return await this.service.updateUser(userId, data);
  }

  @Patch('update/profile')
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '프로필 수정', description: '로그인한 유저의 프로필을 수정합니다' })
  @ApiBody({ type: UpdateProfileDTO })
  @ApiResponse({ type: MakerProfileResponseDTO || DreamerProfileResponseDTO })
  @ApiUnauthorizedResponse({ description: 'Access Token이 없거나 만료되었습니다' })
  async updateProfile(
    @UserRole() role: string,
    @Body() data: Partial<MakerProfileProperties | DreamerProfileProperties>,
    @UserId() userId: string
  ) {
    if (role === 'DREAMER') {
      return await this.service.updateDreamerProfile(userId, data);
    } else {
      return await this.service.updateMakerProfile(userId, data);
    }
  }

  @Public()
  @Post('refresh/token')
  @ApiCookieAuth('refreshToken')
  @ApiOperation({ summary: '토큰 재발급', description: '유저의 Refresh Token을 확인하여 토큰을 재발급합니다' })
  @ApiCreatedResponse({ description: '{ accessToken }' })
  @ApiUnauthorizedResponse({ description: 'Refresh Token이 없거나 만료되었습니다' })
  async getNewToken(@Cookies('refreshToken') refreshToken: string, @Res() res: Response): Promise<void> {
    if (!refreshToken) {
      throw new UnauthorizedError(ErrorMessage.REFRESH_TOKEN_NOT_FOUND);
    }

    const { accessToken, refreshToken: newRefreshToken } = this.service.createNewToken(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      path: '/user/token/refresh',
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken });
  }
}
