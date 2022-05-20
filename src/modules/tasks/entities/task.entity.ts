import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskStatusEntity } from './task-status.entity';
import { TaskTypeEntity } from './task-type.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => TaskStatusEntity, task => task.status)
  @Column({
    default: 'created',
  })
  status: string;

  @OneToMany(() => TaskTypeEntity, task => task.type)
  @Column()
  type: string;
}
