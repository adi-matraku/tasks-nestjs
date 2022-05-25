import { UserEntity } from '../entities/user.entity';

export class Role {
  id: number;
  name: string;
  user?: UserEntity[];
}
