import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import InternalServerError from 'src/common/errors/internalServerError';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT,
      scope: ['email', 'profile']
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    if (!profile) throw new InternalServerError(ErrorMessage.OAUTH_GOOGLE_SERVER_ERROR);

    const { id, emails } = profile;
    if (!emails || emails.length === 0) {
      throw new InternalServerError(ErrorMessage.OAUTH_GOOGLE_SERVER_ERROR);
    }

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value
    };

    return user;
  }
}
