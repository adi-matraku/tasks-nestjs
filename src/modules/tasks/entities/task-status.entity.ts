import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('task_status')
export class TaskStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @ManyToOne(() => TaskEntity, task => task.status)
  status: TaskEntity[];
}
