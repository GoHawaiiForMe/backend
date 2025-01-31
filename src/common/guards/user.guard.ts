import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import ErrorMessage from 'src/common/constants/errorMessage.enum';
import ForbiddenError from 'src/common/errors/forbiddenError';
import UnauthorizedError from 'src/common/errors/unauthorizedError';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { Role } from 'src/common/decorators/roleGuard.decorator';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 비로그인 상태로 요청 가능한 API: @Public() 데코레이터 있을 경우
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    // @Public() 데코레이터가 있어도 jwt 토큰 있을 경우 검증 실행 후 통과
    const request = context.switchToHttp().getRequest();
    console.log('request');
    const authHeader = request.headers?.authorization?.startsWith('Bearer ');
    console.log(authHeader);
    if (isPublic) {
      console.log('isPublic');
      if (authHeader) {
        const canActivate = await super.canActivate(context);
        if (!canActivate) return false; // 토큰이 있지만 만료된 경우
      }
      console.log('go true!');
      return true;
    }

    // canActive를 통해 jwt 토큰 검증 후 context에 payload 정보 설정
    // 로그인 여부 확인하고 액세스토큰 없을 경우 403 에러 발생
    const canActivate = await super.canActivate(context);
    if (!canActivate) return false;

    // 역할에 따라 요청 가능한 API: @Role('MAKER') 데코레이터 값에 따라 403 에러 발생
    const role = this.reflector.get(Role, context.getHandler());
    if (!role) return true;
    if (role !== request.user?.role) {
      throw new ForbiddenError(ErrorMessage.ROLE_FORBIDDEN);
    }

    return true;
  }

  handleRequest<TUser = { userId: string; role: string }>(err: Error, user: TUser): TUser {
    if (err || !user) {
      throw err || new UnauthorizedError(ErrorMessage.TOKEN_UNAUTHORIZED_NOTFOUND);
    }
    return user;
  }
}
