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

// import { TaskTypeEntity } from './task-type.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  name: string;

  @Column({})
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: Date;

  @ManyToOne(() => TaskStatusEntity, status => status.id)
  status: TaskStatusEntity;

  @ManyToMany(() => TaskTypeEntity)
  @JoinTable()
  type: TaskTypeEntity[];
}
