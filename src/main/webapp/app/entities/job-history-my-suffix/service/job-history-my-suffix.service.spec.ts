import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';

import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { Language } from 'app/entities/enumerations/language.model';
import { IJobHistoryMySuffix, JobHistoryMySuffix } from '../job-history-my-suffix.model';

import { JobHistoryMySuffixService } from './job-history-my-suffix.service';

describe('Service Tests', () => {
  describe('JobHistoryMySuffix Service', () => {
    let service: JobHistoryMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: IJobHistoryMySuffix;
    let expectedResult: IJobHistoryMySuffix | IJobHistoryMySuffix[] | boolean | null;
    let currentDate: dayjs.Dayjs;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(JobHistoryMySuffixService);
      httpMock = TestBed.inject(HttpTestingController);
      currentDate = dayjs();

      elemDefault = {
        id: 'AAAAAAA',
        startDate: currentDate,
        endDate: currentDate,
        language: Language.FRENCH,
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find('ABC').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a JobHistoryMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
          },
          returnedFromService
        );

        service.create(new JobHistoryMySuffix()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a JobHistoryMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
            language: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a JobHistoryMySuffix', () => {
        const patchObject = Object.assign(
          {
            language: 'BBBBBB',
          },
          new JobHistoryMySuffix()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
          },
          returnedFromService
        );

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of JobHistoryMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            startDate: currentDate.format(DATE_TIME_FORMAT),
            endDate: currentDate.format(DATE_TIME_FORMAT),
            language: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            startDate: currentDate,
            endDate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a JobHistoryMySuffix', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addJobHistoryMySuffixToCollectionIfMissing', () => {
        it('should add a JobHistoryMySuffix to an empty array', () => {
          const jobHistory: IJobHistoryMySuffix = { id: 'ABC' };
          expectedResult = service.addJobHistoryMySuffixToCollectionIfMissing([], jobHistory);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(jobHistory);
        });

        it('should not add a JobHistoryMySuffix to an array that contains it', () => {
          const jobHistory: IJobHistoryMySuffix = { id: 'ABC' };
          const jobHistoryCollection: IJobHistoryMySuffix[] = [
            {
              ...jobHistory,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addJobHistoryMySuffixToCollectionIfMissing(jobHistoryCollection, jobHistory);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a JobHistoryMySuffix to an array that doesn't contain it", () => {
          const jobHistory: IJobHistoryMySuffix = { id: 'ABC' };
          const jobHistoryCollection: IJobHistoryMySuffix[] = [{ id: 'CBA' }];
          expectedResult = service.addJobHistoryMySuffixToCollectionIfMissing(jobHistoryCollection, jobHistory);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(jobHistory);
        });

        it('should add only unique JobHistoryMySuffix to an array', () => {
          const jobHistoryArray: IJobHistoryMySuffix[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'B2C solid Future' }];
          const jobHistoryCollection: IJobHistoryMySuffix[] = [{ id: 'ABC' }];
          expectedResult = service.addJobHistoryMySuffixToCollectionIfMissing(jobHistoryCollection, ...jobHistoryArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const jobHistory: IJobHistoryMySuffix = { id: 'ABC' };
          const jobHistory2: IJobHistoryMySuffix = { id: 'CBA' };
          expectedResult = service.addJobHistoryMySuffixToCollectionIfMissing([], jobHistory, jobHistory2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(jobHistory);
          expect(expectedResult).toContain(jobHistory2);
        });

        it('should accept null and undefined values', () => {
          const jobHistory: IJobHistoryMySuffix = { id: 'ABC' };
          expectedResult = service.addJobHistoryMySuffixToCollectionIfMissing([], null, jobHistory, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(jobHistory);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
