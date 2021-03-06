jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IJobHistoryMySuffix, JobHistoryMySuffix } from '../job-history-my-suffix.model';
import { JobHistoryMySuffixService } from '../service/job-history-my-suffix.service';

import { JobHistoryMySuffixRoutingResolveService } from './job-history-my-suffix-routing-resolve.service';

describe('Service Tests', () => {
  describe('JobHistoryMySuffix routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: JobHistoryMySuffixRoutingResolveService;
    let service: JobHistoryMySuffixService;
    let resultJobHistoryMySuffix: IJobHistoryMySuffix | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(JobHistoryMySuffixRoutingResolveService);
      service = TestBed.inject(JobHistoryMySuffixService);
      resultJobHistoryMySuffix = undefined;
    });

    describe('resolve', () => {
      it('should return IJobHistoryMySuffix returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultJobHistoryMySuffix = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultJobHistoryMySuffix).toEqual({ id: 'ABC' });
      });

      it('should return new IJobHistoryMySuffix if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultJobHistoryMySuffix = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultJobHistoryMySuffix).toEqual(new JobHistoryMySuffix());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultJobHistoryMySuffix = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultJobHistoryMySuffix).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
