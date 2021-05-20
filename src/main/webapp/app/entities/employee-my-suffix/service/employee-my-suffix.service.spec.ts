import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IEmployeeMySuffix, EmployeeMySuffix } from '../employee-my-suffix.model';

import { EmployeeMySuffixService } from './employee-my-suffix.service';

describe('Service Tests', () => {
  describe('EmployeeMySuffix Service', () => {
    let service: EmployeeMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: IEmployeeMySuffix;
    let expectedResult: IEmployeeMySuffix | IEmployeeMySuffix[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(EmployeeMySuffixService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 'AAAAAAA',
        firstName: 'AAAAAAA',
        lastName: 'AAAAAAA',
        email: 'AAAAAAA',
        phoneNumber: 'AAAAAAA',
        hireDate: currentDate,
        salary: 0,
        commissionPct: 0,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            hireDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find('ABC').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a EmployeeMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            hireDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hireDate: currentDate,
          },
          returnedFromService
        );

        service.create(new EmployeeMySuffix()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a EmployeeMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            email: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            hireDate: currentDate.format(DATE_TIME_FORMAT),
            salary: 1,
            commissionPct: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hireDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a EmployeeMySuffix', () => {
        const patchObject = Object.assign(
          {
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            email: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            salary: 1,
          },
          new EmployeeMySuffix()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            hireDate: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of EmployeeMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            email: 'BBBBBB',
            phoneNumber: 'BBBBBB',
            hireDate: currentDate.format(DATE_TIME_FORMAT),
            salary: 1,
            commissionPct: 1,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hireDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a EmployeeMySuffix', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addEmployeeMySuffixToCollectionIfMissing', () => {
        it('should add a EmployeeMySuffix to an empty array', () => {
          const employee: IEmployeeMySuffix = { id: 'ABC' };
          expectedResult = service.addEmployeeMySuffixToCollectionIfMissing([], employee);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(employee);
        });

        it('should not add a EmployeeMySuffix to an array that contains it', () => {
          const employee: IEmployeeMySuffix = { id: 'ABC' };
          const employeeCollection: IEmployeeMySuffix[] = [
            {
              ...employee,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addEmployeeMySuffixToCollectionIfMissing(employeeCollection, employee);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a EmployeeMySuffix to an array that doesn't contain it", () => {
          const employee: IEmployeeMySuffix = { id: 'ABC' };
          const employeeCollection: IEmployeeMySuffix[] = [{ id: 'CBA' }];
          expectedResult = service.addEmployeeMySuffixToCollectionIfMissing(employeeCollection, employee);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(employee);
        });

        it('should add only unique EmployeeMySuffix to an array', () => {
          const employeeArray: IEmployeeMySuffix[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'Account modular Concrete' }];
          const employeeCollection: IEmployeeMySuffix[] = [{ id: 'ABC' }];
          expectedResult = service.addEmployeeMySuffixToCollectionIfMissing(employeeCollection, ...employeeArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const employee: IEmployeeMySuffix = { id: 'ABC' };
          const employee2: IEmployeeMySuffix = { id: 'CBA' };
          expectedResult = service.addEmployeeMySuffixToCollectionIfMissing([], employee, employee2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(employee);
          expect(expectedResult).toContain(employee2);
        });

        it('should accept null and undefined values', () => {
          const employee: IEmployeeMySuffix = { id: 'ABC' };
          expectedResult = service.addEmployeeMySuffixToCollectionIfMissing([], null, employee, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(employee);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
