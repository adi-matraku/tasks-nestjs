import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../../users/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    // const userSelected = request.user;
    // console.log(userSelected);
    const user = request.user.role;
    if (roles.includes(user.name)) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}
