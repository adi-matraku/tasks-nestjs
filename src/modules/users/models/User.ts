import { RoleEntity } from '../entities/role.entity';

export class User {
  username: string;

  email: string;

  firstName: string;

  lastName: string;

  password: string;

  role: RoleEntity;
}
