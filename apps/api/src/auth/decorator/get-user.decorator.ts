import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as User;

    // Si pasamos un dato como @GetUser('id'), devolvemos solo esa propiedad.
    // Si no, devolvemos el objeto de usuario completo.
    return data ? user?.[data] : user;
  },
);