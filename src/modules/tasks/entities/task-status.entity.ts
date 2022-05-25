import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskEntity } from './task.entity';

@Entity('task_status')
export class TaskStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => TaskEntity, task => task.id)
  task: TaskEntity[];
}
