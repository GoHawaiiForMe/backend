import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Cookies = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const cookies = ctx.switchToHttp().getRequest().cookies || {};

  return cookies?.[data] || cookies;
});
