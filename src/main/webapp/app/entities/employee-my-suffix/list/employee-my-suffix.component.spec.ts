import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { EmployeeMySuffixService } from '../service/employee-my-suffix.service';

import { EmployeeMySuffixComponent } from './employee-my-suffix.component';

describe('Component Tests', () => {
  describe('EmployeeMySuffix Management Component', () => {
    let comp: EmployeeMySuffixComponent;
    let fixture: ComponentFixture<EmployeeMySuffixComponent>;
    let service: EmployeeMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EmployeeMySuffixComponent],
      })
        .overrideTemplate(EmployeeMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeMySuffixComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(EmployeeMySuffixService);

      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [{ id: 'ABC' }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employees[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });

    it('should load a page', () => {
      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.employees[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalledWith(expect.objectContaining({ sort: ['id,asc'] }));
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenLastCalledWith(expect.objectContaining({ sort: ['name,asc', 'id'] }));
    });

    it('should re-initialize the page', () => {
      // WHEN
      comp.loadPage(1);
      comp.reset();

      // THEN
      expect(comp.page).toEqual(0);
      expect(service.query).toHaveBeenCalledTimes(2);
      expect(comp.employees[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
