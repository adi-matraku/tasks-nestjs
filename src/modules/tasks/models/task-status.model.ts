import { TaskEntity } from '../entities/task.entity';

export class TaskStatus {
  id?: number;
  type: string;
  task?: TaskEntity[];
}
