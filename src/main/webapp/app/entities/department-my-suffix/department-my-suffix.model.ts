import { ILocationMySuffix } from 'app/entities/location-my-suffix/location-my-suffix.model';
import { IEmployeeMySuffix } from 'app/entities/employee-my-suffix/employee-my-suffix.model';

export interface IDepartmentMySuffix {
  id?: string;
  departmentName?: string;
  location?: ILocationMySuffix | null;
  employees?: IEmployeeMySuffix[] | null;
}

export class DepartmentMySuffix implements IDepartmentMySuffix {
  constructor(
    public id?: string,
    public departmentName?: string,
    public location?: ILocationMySuffix | null,
    public employees?: IEmployeeMySuffix[] | null
  ) {}
}

export function getDepartmentMySuffixIdentifier(department: IDepartmentMySuffix): string | undefined {
  return department.id;
}
