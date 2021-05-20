jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DepartmentMySuffixService } from '../service/department-my-suffix.service';
import { IDepartmentMySuffix, DepartmentMySuffix } from '../department-my-suffix.model';
import { ILocationMySuffix } from 'app/entities/location-my-suffix/location-my-suffix.model';
import { LocationMySuffixService } from 'app/entities/location-my-suffix/service/location-my-suffix.service';

import { DepartmentMySuffixUpdateComponent } from './department-my-suffix-update.component';

describe('Component Tests', () => {
  describe('DepartmentMySuffix Management Update Component', () => {
    let comp: DepartmentMySuffixUpdateComponent;
    let fixture: ComponentFixture<DepartmentMySuffixUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let departmentService: DepartmentMySuffixService;
    let locationService: LocationMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DepartmentMySuffixUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DepartmentMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentMySuffixUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      departmentService = TestBed.inject(DepartmentMySuffixService);
      locationService = TestBed.inject(LocationMySuffixService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call location query and add missing value', () => {
        const department: IDepartmentMySuffix = { id: 'CBA' };
        const location: ILocationMySuffix = { id: 'algorithm magnetic' };
        department.location = location;

        const locationCollection: ILocationMySuffix[] = [{ id: 'Soft Colombia' }];
        spyOn(locationService, 'query').and.returnValue(of(new HttpResponse({ body: locationCollection })));
        const expectedCollection: ILocationMySuffix[] = [location, ...locationCollection];
        spyOn(locationService, 'addLocationMySuffixToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ department });
        comp.ngOnInit();

        expect(locationService.query).toHaveBeenCalled();
        expect(locationService.addLocationMySuffixToCollectionIfMissing).toHaveBeenCalledWith(locationCollection, location);
        expect(comp.locationsCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const department: IDepartmentMySuffix = { id: 'CBA' };
        const location: ILocationMySuffix = { id: 'installation International generating' };
        department.location = location;

        activatedRoute.data = of({ department });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(department));
        expect(comp.locationsCollection).toContain(location);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const department = { id: 'ABC' };
        spyOn(departmentService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ department });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: department }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(departmentService.update).toHaveBeenCalledWith(department);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const department = new DepartmentMySuffix();
        spyOn(departmentService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ department });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: department }));
        saveSubject.complete();

        // THEN
        expect(departmentService.create).toHaveBeenCalledWith(department);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const department = { id: 'ABC' };
        spyOn(departmentService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ department });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(departmentService.update).toHaveBeenCalledWith(department);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackLocationMySuffixById', () => {
        it('Should return tracked LocationMySuffix primary key', () => {
          const entity = { id: 'ABC' };
          const trackResult = comp.trackLocationMySuffixById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
