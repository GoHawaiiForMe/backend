import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { OAuthProviderValues } from 'src/common/constants/oauth.type';
import InternalServerError from 'src/common/errors/internalServerError';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: process.env.NAVER_REDIRECT,
      authorizationURL: 'https://nid.naver.com/oauth2.0/authorize',
      tokenURL: 'https://nid.naver.com/oauth2.0/token',
      userProfileURL: 'https://openapi.naver.com/v1/nid/me'
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    if (!profile) throw new InternalServerError(ErrorMessage.OAUTH_NAVER_SERVER_ERROR);

    const user = { provider: OAuthProviderValues.NAVER, providerId: profile.id };

    return user;
  }
}
