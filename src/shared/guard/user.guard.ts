import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import ErrorMessage from 'src/common/enums/error.message';
import ForbiddenError from 'src/common/errors/forbiddenError';
import UnauthorizedError from 'src/common/errors/unauthorizedError';
import { IS_PUBLIC_KEY } from 'src/shared/decorator/public.decorator';
import { Role } from 'src/shared/decorator/roleGuard.decorator';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 비로그인 상태로 요청 가능한 API: @Public() 데코레이터 있을 경우 통과
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isPublic) return true;

    // canActive를 통해 jwt 토큰 검증 후 context에 payload 정보 설정
    // 로그인 여부 확인하고 액세스토큰 없을 경우 403 에러 발생
    const canActivate = await super.canActivate(context);
    if (!canActivate) return false;

    // 역할에 따라 요청 가능한 API: @Role('MAKER') 데코레이터 값에 따라 403 에러 발생
    const role = this.reflector.get(Role, context.getHandler());
    if (!role) return true;
    const request = context.switchToHttp().getRequest();
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
