import { TaskStatusEntity } from '../entities/task-status.entity';
import { TaskTypeEntity } from '../entities/task-type.entity';
import { User } from '../../users/models/User';

export class Task {
  id: number;
  name: string;
  description: string;
  status: TaskStatusEntity;
  type: TaskTypeEntity[];
  user: User;
  lastUpdatedAt: Date;
  createdAt: Date;
}
