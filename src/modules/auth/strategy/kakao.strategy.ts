import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import { OAuthProviderValues } from 'src/common/constants/oauth.type';
import InternalServerError from 'src/common/errors/internalServerError';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_REDIRECT
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    if (!profile) throw new InternalServerError(ErrorMessage.OAUTH_KAKAO_SERVER_ERROR);

    const { _json } = profile;
    const user = { provider: OAuthProviderValues.KAKAO, providerId: String(_json.id) };

    return user;
  }
}
