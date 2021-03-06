jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEmployeeMySuffix, EmployeeMySuffix } from '../employee-my-suffix.model';
import { EmployeeMySuffixService } from '../service/employee-my-suffix.service';

import { EmployeeMySuffixRoutingResolveService } from './employee-my-suffix-routing-resolve.service';

describe('Service Tests', () => {
  describe('EmployeeMySuffix routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EmployeeMySuffixRoutingResolveService;
    let service: EmployeeMySuffixService;
    let resultEmployeeMySuffix: IEmployeeMySuffix | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EmployeeMySuffixRoutingResolveService);
      service = TestBed.inject(EmployeeMySuffixService);
      resultEmployeeMySuffix = undefined;
    });

    describe('resolve', () => {
      it('should return IEmployeeMySuffix returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeMySuffix = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultEmployeeMySuffix).toEqual({ id: 'ABC' });
      });

      it('should return new IEmployeeMySuffix if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeMySuffix = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEmployeeMySuffix).toEqual(new EmployeeMySuffix());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 'ABC' };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEmployeeMySuffix = result;
        });

        // THEN
        expect(service.find).toBeCalledWith('ABC');
        expect(resultEmployeeMySuffix).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
