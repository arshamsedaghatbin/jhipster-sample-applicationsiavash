jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { EmployeeMySuffixService } from '../service/employee-my-suffix.service';
import { IEmployeeMySuffix, EmployeeMySuffix } from '../employee-my-suffix.model';
import { IDepartmentMySuffix } from 'app/entities/department-my-suffix/department-my-suffix.model';
import { DepartmentMySuffixService } from 'app/entities/department-my-suffix/service/department-my-suffix.service';

import { EmployeeMySuffixUpdateComponent } from './employee-my-suffix-update.component';

describe('Component Tests', () => {
  describe('EmployeeMySuffix Management Update Component', () => {
    let comp: EmployeeMySuffixUpdateComponent;
    let fixture: ComponentFixture<EmployeeMySuffixUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let employeeService: EmployeeMySuffixService;
    let departmentService: DepartmentMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [EmployeeMySuffixUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(EmployeeMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeMySuffixUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      employeeService = TestBed.inject(EmployeeMySuffixService);
      departmentService = TestBed.inject(DepartmentMySuffixService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call EmployeeMySuffix query and add missing value', () => {
        const employee: IEmployeeMySuffix = { id: 'CBA' };
        const manager: IEmployeeMySuffix = { id: 'Tuna Bedfordshire' };
        employee.manager = manager;

        const employeeCollection: IEmployeeMySuffix[] = [{ id: 'Tuna' }];
        spyOn(employeeService, 'query').and.returnValue(of(new HttpResponse({ body: employeeCollection })));
        const additionalEmployeeMySuffixes = [manager];
        const expectedCollection: IEmployeeMySuffix[] = [...additionalEmployeeMySuffixes, ...employeeCollection];
        spyOn(employeeService, 'addEmployeeMySuffixToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ employee });
        comp.ngOnInit();

        expect(employeeService.query).toHaveBeenCalled();
        expect(employeeService.addEmployeeMySuffixToCollectionIfMissing).toHaveBeenCalledWith(
          employeeCollection,
          ...additionalEmployeeMySuffixes
        );
        expect(comp.employeesSharedCollection).toEqual(expectedCollection);
      });

      it('Should call DepartmentMySuffix query and add missing value', () => {
        const employee: IEmployeeMySuffix = { id: 'CBA' };
        const department: IDepartmentMySuffix = { id: 'Rupee AGP engage' };
        employee.department = department;

        const departmentCollection: IDepartmentMySuffix[] = [{ id: '4th metrics' }];
        spyOn(departmentService, 'query').and.returnValue(of(new HttpResponse({ body: departmentCollection })));
        const additionalDepartmentMySuffixes = [department];
        const expectedCollection: IDepartmentMySuffix[] = [...additionalDepartmentMySuffixes, ...departmentCollection];
        spyOn(departmentService, 'addDepartmentMySuffixToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ employee });
        comp.ngOnInit();

        expect(departmentService.query).toHaveBeenCalled();
        expect(departmentService.addDepartmentMySuffixToCollectionIfMissing).toHaveBeenCalledWith(
          departmentCollection,
          ...additionalDepartmentMySuffixes
        );
        expect(comp.departmentsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const employee: IEmployeeMySuffix = { id: 'CBA' };
        const manager: IEmployeeMySuffix = { id: 'Handmade Assistant' };
        employee.manager = manager;
        const department: IDepartmentMySuffix = { id: 'open-source' };
        employee.department = department;

        activatedRoute.data = of({ employee });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(employee));
        expect(comp.employeesSharedCollection).toContain(manager);
        expect(comp.departmentsSharedCollection).toContain(department);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const employee = { id: 'ABC' };
        spyOn(employeeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ employee });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: employee }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(employeeService.update).toHaveBeenCalledWith(employee);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const employee = new EmployeeMySuffix();
        spyOn(employeeService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ employee });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: employee }));
        saveSubject.complete();

        // THEN
        expect(employeeService.create).toHaveBeenCalledWith(employee);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const employee = { id: 'ABC' };
        spyOn(employeeService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ employee });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(employeeService.update).toHaveBeenCalledWith(employee);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackEmployeeMySuffixById', () => {
        it('Should return tracked EmployeeMySuffix primary key', () => {
          const entity = { id: 'ABC' };
          const trackResult = comp.trackEmployeeMySuffixById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });

      describe('trackDepartmentMySuffixById', () => {
        it('Should return tracked DepartmentMySuffix primary key', () => {
          const entity = { id: 'ABC' };
          const trackResult = comp.trackDepartmentMySuffixById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
