import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import UserService from './user.service';
import { Public } from 'src/common/decorators/public.decorator';
import { UserId } from 'src/common/decorators/user.decorator';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FilteredUserResponseDTO, followResponseDTO, UserResponseDTO } from './types/user.response.dto';
import { FilteredUserProperties, UserProperties } from './types/user.types';
import UpdateUserDTO from './types/updateUser.dto';
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

  @Public()
  @Get('maker/:makerId')
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
}
