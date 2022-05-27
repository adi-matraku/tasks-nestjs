import { TaskEntity } from 'src/modules/tasks/entities/task.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from './role.entity';

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

  @Column()
  password: string;

  @Column({ default: null })
  salt: string;

  @Column()
  createdAt: Date;

  @Column({ default: null })
  lastUpdatedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => TaskEntity, task => task.id)
  task: TaskEntity[];

  @ManyToOne(() => RoleEntity, role => role.id)
  @JoinTable()
  role: RoleEntity;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
