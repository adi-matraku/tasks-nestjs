import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('task_type')
export class TaskTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: true, select: false })
  isActive: boolean;

  @ManyToMany(() => TaskEntity)
  task: TaskEntity[];
}
