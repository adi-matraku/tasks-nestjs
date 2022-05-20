import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('task_type')
export class TaskTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  name: string;

  @ManyToMany(() => TaskEntity)
  task: TaskEntity[];
}
