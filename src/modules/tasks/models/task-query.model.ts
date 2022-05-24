import { Task } from './task.model';

export class pageDetails {
  total: number;
  pageSize: number;
  pageNumber: number;
}

export class TaskQuery {
  data: Task[];
  meta: pageDetails;
}
