import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('task_type')
export class TaskTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  status: string;

  @ManyToOne(() => TaskEntity, task => task.type)
  type: TaskEntity[];
}
