import { IJobMySuffix } from 'app/entities/job-my-suffix/job-my-suffix.model';

export interface ITaskMySuffix {
  id?: string;
  title?: string | null;
  description?: string | null;
  jobs?: IJobMySuffix[] | null;
}

export class TaskMySuffix implements ITaskMySuffix {
  constructor(public id?: string, public title?: string | null, public description?: string | null, public jobs?: IJobMySuffix[] | null) {}
}

export function getTaskMySuffixIdentifier(task: ITaskMySuffix): string | undefined {
  return task.id;
}
