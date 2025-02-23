import { Body, Controller, Get, Patch } from '@nestjs/common';
import ProfileService from './profile.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { DreamerProfileResponseDTO, MakerProfileResponseDTO } from '../user/types/user.response.dto';
import { UserRole } from 'src/common/decorators/role.decorator';
import { UserId } from 'src/common/decorators/user.decorator';
import { DreamerProfileProperties, MakerProfileProperties } from './types/profile.types';
import UpdateProfileDTO from './types/updateProfile.dto';

@Controller('profile')
export default class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
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
