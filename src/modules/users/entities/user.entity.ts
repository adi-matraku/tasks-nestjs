import { TaskEntity } from 'src/modules/tasks/entities/task.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from './role.entity';
import { RefreshTokenEntity } from '../../auth/entities/refresh-token.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ select: false })
  password: string;

  @Column({ default: null, select: false })
  salt: string;

  @Column()
  createdAt: Date;

  @Column({ default: null })
  lastUpdatedAt: Date;

  @Column({ default: true, select: false })
  isActive: boolean;

  @OneToMany(() => TaskEntity, task => task.id)
  task: TaskEntity[];

  @ManyToOne(() => RoleEntity, role => role.id, {
    eager: true,
  })
  @JoinColumn()
  role: RoleEntity;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
