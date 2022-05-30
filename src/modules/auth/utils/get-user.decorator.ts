import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { User } from '../models/jwt-payload.interface';
import { UserEntity } from '../../users/entities/user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserEntity => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
