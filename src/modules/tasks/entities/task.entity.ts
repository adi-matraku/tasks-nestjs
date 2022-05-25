import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatusEntity } from './task-status.entity';
import { TaskTypeEntity } from './task-type.entity';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/modules/users/entities/user.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  name: string;

  @Column({})
  description: string;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column({ default: null })
  lastUpdatedAt: Date;

  @Column({ default: null })
  lastUpdatedBy: Date;

  @ManyToOne(() => TaskStatusEntity, status => status.id)
  status: TaskStatusEntity;

  @ManyToMany(() => TaskTypeEntity)
  @JoinTable()
  type: TaskTypeEntity[];

  @ManyToOne(() => UserEntity, user => user.id)
  user: UserEntity;
}
