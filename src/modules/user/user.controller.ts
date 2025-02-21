import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import UserService from './user.service';
import { Public } from 'src/common/decorators/public.decorator';
import { UserId } from 'src/common/decorators/user.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {
  DreamerProfileResponseDTO,
  FilteredUserResponseDTO,
  followResponseDTO,
  MakerProfileResponseDTO,
  UserResponseDTO
} from './types/user.response.dto';
import UpdateProfileDTO from './types/updateProfile.dto';
import { DreamerProfileProperties, MakerProfileProperties } from './types/profile.types';
import { FilteredUserProperties, UserProperties } from './types/user.types';
import UpdateUserDTO from './types/updateUser.dto';
import { UserRole } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/decorators/roleGuard.decorator';
import { GetMakerListQueryDTO, PaginationQueryDTO } from 'src/modules/user/types/query.dto';

@Controller('users')
export default class UserController {
  constructor(private readonly service: UserService) {}

  @Get('me')
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

  @Public()
  @Get('profile/:makerId')
  async getProfileById(@Param('makerId') makerId: string, @UserId() dreamerId: string) {
    return await this.service.getProfileCardData(makerId, dreamerId, true);
  }

  @Get('following')
  @Role('DREAMER')
  async getFollowList(
    @UserId() userId: string,
    @Query() options: PaginationQueryDTO
  ): Promise<{ totalCount: number; list: followResponseDTO[] }> {
    return await this.service.getFollows(userId, options);
  }

  @Public()
  @Get('makers')
  async getMakerList(@UserId() userId: string, @Query() options: GetMakerListQueryDTO) {
    return await this.service.getMakers(options, userId);
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
    }
    return await this.service.updateMakerProfile(userId, data);
  }
}
