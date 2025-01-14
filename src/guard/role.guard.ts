import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import ErrorMessage from 'src/common/enums/error.message';
import ForbiddenError from 'src/common/errors/forbiddenError';
import { Role } from 'src/decorator/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get(Role, context.getHandler());
    if (!role) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user;
    console.log('데코레이터:', role, '유저:', user?.role);
    return role === user?.role;
  }

  handleRequest<TUser = any>(err: any, user: any): TUser {
    if (err) {
      throw new ForbiddenError(ErrorMessage.ROLE_FORBIDDEN);
    }
    return user;
  }
}
