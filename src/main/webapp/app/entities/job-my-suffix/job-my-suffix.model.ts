import { ITaskMySuffix } from 'app/entities/task-my-suffix/task-my-suffix.model';
import { IEmployeeMySuffix } from 'app/entities/employee-my-suffix/employee-my-suffix.model';

export interface IJobMySuffix {
  id?: string;
  jobTitle?: string | null;
  minSalary?: number | null;
  maxSalary?: number | null;
  tasks?: ITaskMySuffix[] | null;
  employee?: IEmployeeMySuffix | null;
}

export class JobMySuffix implements IJobMySuffix {
  constructor(
    public id?: string,
    public jobTitle?: string | null,
    public minSalary?: number | null,
    public maxSalary?: number | null,
    public tasks?: ITaskMySuffix[] | null,
    public employee?: IEmployeeMySuffix | null
  ) {}
}

export function getJobMySuffixIdentifier(job: IJobMySuffix): string | undefined {
  return job.id;
}
