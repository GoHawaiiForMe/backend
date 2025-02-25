import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import AuthService from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { Cookies } from 'src/common/decorators/cookie.decorator';
import UnauthorizedError from 'src/common/errors/unauthorizedError';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/common/decorators/user.decorator';
import { OAuthProperties } from 'src/modules/auth/types/auth.types';
import { OAuthProvider } from 'src/common/constants/oauth.type';
import SignupDTO from './types/signup.dto';
import LoginDTO from './types/login.dto';

@Controller('auth')
export default class AuthController {
  constructor(private readonly service: AuthService) {}

  @Public()
  @Post('signup')
  @ApiOperation({ summary: '회원가입', description: '유저 정보와 프로필을 통해 새로운 유저를 생성합니다' })
  @ApiBody({ type: SignupDTO })
  @ApiCreatedResponse({ description: '회원가입 성공' })
  @ApiBadRequestResponse({ description: '이미 존재하는 닉네임 또는 이메일입니다' })
  async signup(@Body() data: SignupDTO, @User() oauth: { provider: OAuthProvider; providerId: string }) {
    const { user, profile } = data;

    if (oauth) return await this.service.createUser({ ...oauth, ...user }, profile);

    return await this.service.createUser(user, profile);
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: '로그인', description: '이메일과 비밀번호로 유저 로그인 요청을 보냅니다' })
  @ApiBody({ type: LoginDTO })
  @ApiCreatedResponse({ description: '{ accessToken }' })
  @ApiBadRequestResponse({ description: '이메일 또는 비밀번호가 유저 정보와 일치하지 않습니다' })
  async login(@Body() data: LoginDTO, @Res() res: Response): Promise<Response> {
    const user = await this.service.login(data.email, data.password);
    const tokenPayload = { userId: user.id, role: user.role };
    const { accessToken, refreshToken } = this.service.createTokens(tokenPayload);

    res.cookie('refreshToken', refreshToken, {
      path: '/auth/refresh/token',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ accessToken });
  }

  @Public()
  @Post('refresh/token')
  @ApiCookieAuth('refreshToken')
  @ApiOperation({ summary: '토큰 재발급', description: '유저의 Refresh Token을 확인하여 토큰을 재발급합니다' })
  @ApiCreatedResponse({ description: '{ accessToken }' })
  @ApiUnauthorizedResponse({ description: 'Refresh Token이 없거나 만료되었습니다' })
  async getNewToken(@Cookies('refreshToken') refreshToken: string, @Res() res: Response): Promise<Response> {
    if (!refreshToken) {
      throw new UnauthorizedError(ErrorMessage.REFRESH_TOKEN_NOT_FOUND);
    }

    const { accessToken, refreshToken: newRefreshToken } = this.service.createNewToken(refreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      path: '/auth/refresh/token',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({ accessToken });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('check/email')
  async checkEmail(@Body() body: { email: string }): Promise<boolean> {
    return await this.service.checkEmail(body.email);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('check/nickname')
  async checkNickName(@Body() body: { nickName: string }): Promise<boolean> {
    return await this.service.checkNickName(body.nickName);
  }

  @Public()
  @Get('google')
  toGoogle(): { redirectUrl: string } {
    const redirectUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT}&response_type=code&scope=email profile`;
    return { redirectUrl };
  }

  @Public()
  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async loginByGoogle(@User() user: OAuthProperties, @Res() res: Response): Promise<void> {
    const tokens = await this.service.socialLogin(user);

    // 최초 로그인의 경우 해당 값을 프로필과 함께 등록시 회원 가입 진행
    if ('OAuthToken' in tokens) {
      return res.redirect(`${process.env.CLIENT_REDIRECT}/signup/oauth?auth=${tokens.OAuthToken}`);
    }

    // 기존 회원의 경우 토큰 반환
    res.cookie('refreshToken', tokens.refreshToken, {
      path: '/auth/refresh/token',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.redirect(`${process.env.CLIENT_REDIRECT}?auth=${tokens.accessToken}`);
  }

  @Public()
  @Get('kakao')
  toKakao(): { redirectUrl: string } {
    const redirectUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT}`;
    return { redirectUrl };
  }

  @Public()
  @UseGuards(AuthGuard('kakao'))
  @Get('kakao/callback')
  async loginByKakao(@User() user: OAuthProperties, @Res() res: Response): Promise<void> {
    const tokens = await this.service.socialLogin(user);

    if ('OAuthToken' in tokens) {
      return res.redirect(`${process.env.CLIENT_REDIRECT}/signup/oauth?auth=${tokens.OAuthToken}`);
    }

    res.cookie('refreshToken', tokens.refreshToken, {
      path: '/auth/refresh/token',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.redirect(`${process.env.CLIENT_REDIRECT}?auth=${tokens.accessToken}`);
  }

  @Public()
  @Get('naver')
  toNaver(): { redirectUrl: string } {
    const state = Math.random().toString(36).substring(7);
    const redirectUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${process.env.NAVER_REDIRECT}&state=${state}`;

    return { redirectUrl };
  }

  @Public()
  @UseGuards(AuthGuard('naver'))
  @Get('naver/callback')
  async loginByNaver(@User() user: OAuthProperties, @Res() res: Response): Promise<void> {
    const tokens = await this.service.socialLogin(user);

    if ('OAuthToken' in tokens) {
      return res.redirect(`${process.env.CLIENT_REDIRECT}/signup/oauth?auth=${tokens.OAuthToken}`);
    }

    res.cookie('refreshToken', tokens.refreshToken, {
      path: '/auth/refresh/token',
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.redirect(`${process.env.CLIENT_REDIRECT}?auth=${tokens.accessToken}`);
  }
}
