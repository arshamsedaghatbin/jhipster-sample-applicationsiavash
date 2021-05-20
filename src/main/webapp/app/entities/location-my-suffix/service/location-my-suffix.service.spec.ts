import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ILocationMySuffix, LocationMySuffix } from '../location-my-suffix.model';

import { LocationMySuffixService } from './location-my-suffix.service';

describe('Service Tests', () => {
  describe('LocationMySuffix Service', () => {
    let service: LocationMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: ILocationMySuffix;
    let expectedResult: ILocationMySuffix | ILocationMySuffix[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(LocationMySuffixService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        streetAddress: 'AAAAAAA',
        postalCode: 'AAAAAAA',
        city: 'AAAAAAA',
        stateProvince: 'AAAAAAA',
      };
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find('ABC').subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a LocationMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new LocationMySuffix()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a LocationMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            streetAddress: 'BBBBBB',
            postalCode: 'BBBBBB',
            city: 'BBBBBB',
            stateProvince: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a LocationMySuffix', () => {
        const patchObject = Object.assign(
          {
            streetAddress: 'BBBBBB',
            city: 'BBBBBB',
          },
          new LocationMySuffix()
        );

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of LocationMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            streetAddress: 'BBBBBB',
            postalCode: 'BBBBBB',
            city: 'BBBBBB',
            stateProvince: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a LocationMySuffix', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addLocationMySuffixToCollectionIfMissing', () => {
        it('should add a LocationMySuffix to an empty array', () => {
          const location: ILocationMySuffix = { id: 'ABC' };
          expectedResult = service.addLocationMySuffixToCollectionIfMissing([], location);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(location);
        });

        it('should not add a LocationMySuffix to an array that contains it', () => {
          const location: ILocationMySuffix = { id: 'ABC' };
          const locationCollection: ILocationMySuffix[] = [
            {
              ...location,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addLocationMySuffixToCollectionIfMissing(locationCollection, location);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a LocationMySuffix to an array that doesn't contain it", () => {
          const location: ILocationMySuffix = { id: 'ABC' };
          const locationCollection: ILocationMySuffix[] = [{ id: 'CBA' }];
          expectedResult = service.addLocationMySuffixToCollectionIfMissing(locationCollection, location);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(location);
        });

        it('should add only unique LocationMySuffix to an array', () => {
          const locationArray: ILocationMySuffix[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'Grocery the program' }];
          const locationCollection: ILocationMySuffix[] = [{ id: 'ABC' }];
          expectedResult = service.addLocationMySuffixToCollectionIfMissing(locationCollection, ...locationArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const location: ILocationMySuffix = { id: 'ABC' };
          const location2: ILocationMySuffix = { id: 'CBA' };
          expectedResult = service.addLocationMySuffixToCollectionIfMissing([], location, location2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(location);
          expect(expectedResult).toContain(location2);
        });

        it('should accept null and undefined values', () => {
          const location: ILocationMySuffix = { id: 'ABC' };
          expectedResult = service.addLocationMySuffixToCollectionIfMissing([], null, location, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(location);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
