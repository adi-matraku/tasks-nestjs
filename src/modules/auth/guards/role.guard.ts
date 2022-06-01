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
    const userAccount = request.user;
    if (!userAccount) {
      throw new UnauthorizedException();
    }
    const userRole = request.user.role;
    if (roles.includes(userRole.name)) {
      console.log('includes', true);
      return true;
    } else {
      console.log('shit.');
      throw new UnauthorizedException();
    }
  }
}
