import { RoleEntity } from '../entities/role.entity';
import { Exclude } from 'class-transformer';

export class User {
  username: string;

  email: string;

  firstName: string;

  lastName: string;

  salt: string;

  @Exclude()
  password: string;

  role: RoleEntity;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
