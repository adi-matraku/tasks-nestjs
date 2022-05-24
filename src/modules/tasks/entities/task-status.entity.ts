import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TaskEntity } from './task.entity';
import { Exclude } from 'class-transformer';

@Entity('task_status')
export class TaskStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => TaskEntity, task => task.id)
  task: TaskEntity[];
}
