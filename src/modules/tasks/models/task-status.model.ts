import { TaskEntity } from '../entities/task.entity';

export class TaskStatus {
  id?: number;
  status: string;
  task?: TaskEntity[];
}
