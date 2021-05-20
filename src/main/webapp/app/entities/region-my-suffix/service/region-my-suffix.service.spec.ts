import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRegionMySuffix, RegionMySuffix } from '../region-my-suffix.model';

import { RegionMySuffixService } from './region-my-suffix.service';

describe('Service Tests', () => {
  describe('RegionMySuffix Service', () => {
    let service: RegionMySuffixService;
    let httpMock: HttpTestingController;
    let elemDefault: IRegionMySuffix;
    let expectedResult: IRegionMySuffix | IRegionMySuffix[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      service = TestBed.inject(RegionMySuffixService);
      httpMock = TestBed.inject(HttpTestingController);

      elemDefault = {
        id: 'AAAAAAA',
        regionName: 'AAAAAAA',
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

      it('should create a RegionMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new RegionMySuffix()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RegionMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            regionName: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should partial update a RegionMySuffix', () => {
        const patchObject = Object.assign({}, new RegionMySuffix());

        const returnedFromService = Object.assign(patchObject, elemDefault);

        const expected = Object.assign({}, returnedFromService);

        service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PATCH' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of RegionMySuffix', () => {
        const returnedFromService = Object.assign(
          {
            id: 'BBBBBB',
            regionName: 'BBBBBB',
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

      it('should delete a RegionMySuffix', () => {
        service.delete('ABC').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });

      describe('addRegionMySuffixToCollectionIfMissing', () => {
        it('should add a RegionMySuffix to an empty array', () => {
          const region: IRegionMySuffix = { id: 'ABC' };
          expectedResult = service.addRegionMySuffixToCollectionIfMissing([], region);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(region);
        });

        it('should not add a RegionMySuffix to an array that contains it', () => {
          const region: IRegionMySuffix = { id: 'ABC' };
          const regionCollection: IRegionMySuffix[] = [
            {
              ...region,
            },
            { id: 'CBA' },
          ];
          expectedResult = service.addRegionMySuffixToCollectionIfMissing(regionCollection, region);
          expect(expectedResult).toHaveLength(2);
        });

        it("should add a RegionMySuffix to an array that doesn't contain it", () => {
          const region: IRegionMySuffix = { id: 'ABC' };
          const regionCollection: IRegionMySuffix[] = [{ id: 'CBA' }];
          expectedResult = service.addRegionMySuffixToCollectionIfMissing(regionCollection, region);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(region);
        });

        it('should add only unique RegionMySuffix to an array', () => {
          const regionArray: IRegionMySuffix[] = [{ id: 'ABC' }, { id: 'CBA' }, { id: 'driver paradigms Plastic' }];
          const regionCollection: IRegionMySuffix[] = [{ id: 'ABC' }];
          expectedResult = service.addRegionMySuffixToCollectionIfMissing(regionCollection, ...regionArray);
          expect(expectedResult).toHaveLength(3);
        });

        it('should accept varargs', () => {
          const region: IRegionMySuffix = { id: 'ABC' };
          const region2: IRegionMySuffix = { id: 'CBA' };
          expectedResult = service.addRegionMySuffixToCollectionIfMissing([], region, region2);
          expect(expectedResult).toHaveLength(2);
          expect(expectedResult).toContain(region);
          expect(expectedResult).toContain(region2);
        });

        it('should accept null and undefined values', () => {
          const region: IRegionMySuffix = { id: 'ABC' };
          expectedResult = service.addRegionMySuffixToCollectionIfMissing([], null, region, undefined);
          expect(expectedResult).toHaveLength(1);
          expect(expectedResult).toContain(region);
        });
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
