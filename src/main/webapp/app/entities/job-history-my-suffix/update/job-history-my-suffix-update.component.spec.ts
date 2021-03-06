jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { JobHistoryMySuffixService } from '../service/job-history-my-suffix.service';
import { IJobHistoryMySuffix, JobHistoryMySuffix } from '../job-history-my-suffix.model';
import { IJobMySuffix } from 'app/entities/job-my-suffix/job-my-suffix.model';
import { JobMySuffixService } from 'app/entities/job-my-suffix/service/job-my-suffix.service';
import { IDepartmentMySuffix } from 'app/entities/department-my-suffix/department-my-suffix.model';
import { DepartmentMySuffixService } from 'app/entities/department-my-suffix/service/department-my-suffix.service';
import { IEmployeeMySuffix } from 'app/entities/employee-my-suffix/employee-my-suffix.model';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix/service/employee-my-suffix.service';

import { JobHistoryMySuffixUpdateComponent } from './job-history-my-suffix-update.component';

describe('Component Tests', () => {
  describe('JobHistoryMySuffix Management Update Component', () => {
    let comp: JobHistoryMySuffixUpdateComponent;
    let fixture: ComponentFixture<JobHistoryMySuffixUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let jobHistoryService: JobHistoryMySuffixService;
    let jobService: JobMySuffixService;
    let departmentService: DepartmentMySuffixService;
    let employeeService: EmployeeMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [JobHistoryMySuffixUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(JobHistoryMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(JobHistoryMySuffixUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      jobHistoryService = TestBed.inject(JobHistoryMySuffixService);
      jobService = TestBed.inject(JobMySuffixService);
      departmentService = TestBed.inject(DepartmentMySuffixService);
      employeeService = TestBed.inject(EmployeeMySuffixService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call job query and add missing value', () => {
        const jobHistory: IJobHistoryMySuffix = { id: 'CBA' };
        const job: IJobMySuffix = { id: 'hacking maximize' };
        jobHistory.job = job;

        const jobCollection: IJobMySuffix[] = [{ id: 'deposit' }];
        spyOn(jobService, 'query').and.returnValue(of(new HttpResponse({ body: jobCollection })));
        const expectedCollection: IJobMySuffix[] = [job, ...jobCollection];
        spyOn(jobService, 'addJobMySuffixToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ jobHistory });
        comp.ngOnInit();

        expect(jobService.query).toHaveBeenCalled();
        expect(jobService.addJobMySuffixToCollectionIfMissing).toHaveBeenCalledWith(jobCollection, job);
        expect(comp.jobsCollection).toEqual(expectedCollection);
      });

      it('Should call department query and add missing value', () => {
        const jobHistory: IJobHistoryMySuffix = { id: 'CBA' };
        const department: IDepartmentMySuffix = { id: 'CFA' };
        jobHistory.department = department;

        const departmentCollection: IDepartmentMySuffix[] = [{ id: 'Tasty' }];
        spyOn(departmentService, 'query').and.returnValue(of(new HttpResponse({ body: departmentCollection })));
        const expectedCollection: IDepartmentMySuffix[] = [department, ...departmentCollection];
        spyOn(departmentService, 'addDepartmentMySuffixToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ jobHistory });
        comp.ngOnInit();

        expect(departmentService.query).toHaveBeenCalled();
        expect(departmentService.addDepartmentMySuffixToCollectionIfMissing).toHaveBeenCalledWith(departmentCollection, department);
        expect(comp.departmentsCollection).toEqual(expectedCollection);
      });

      it('Should call employee query and add missing value', () => {
        const jobHistory: IJobHistoryMySuffix = { id: 'CBA' };
        const employee: IEmployeeMySuffix = { id: 'reinvent orchestrate' };
        jobHistory.employee = employee;

        const employeeCollection: IEmployeeMySuffix[] = [{ id: 'Africa synergy Albania' }];
        spyOn(employeeService, 'query').and.returnValue(of(new HttpResponse({ body: employeeCollection })));
        const expectedCollection: IEmployeeMySuffix[] = [employee, ...employeeCollection];
        spyOn(employeeService, 'addEmployeeMySuffixToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ jobHistory });
        comp.ngOnInit();

        expect(employeeService.query).toHaveBeenCalled();
        expect(employeeService.addEmployeeMySuffixToCollectionIfMissing).toHaveBeenCalledWith(employeeCollection, employee);
        expect(comp.employeesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const jobHistory: IJobHistoryMySuffix = { id: 'CBA' };
        const job: IJobMySuffix = { id: 'ubiquitous' };
        jobHistory.job = job;
        const department: IDepartmentMySuffix = { id: 'web-readiness Iraq Cloned' };
        jobHistory.department = department;
        const employee: IEmployeeMySuffix = { id: 'mobile Granite' };
        jobHistory.employee = employee;

        activatedRoute.data = of({ jobHistory });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(jobHistory));
        expect(comp.jobsCollection).toContain(job);
        expect(comp.departmentsCollection).toContain(department);
        expect(comp.employeesCollection).toContain(employee);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const jobHistory = { id: 'ABC' };
        spyOn(jobHistoryService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ jobHistory });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: jobHistory }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(jobHistoryService.update).toHaveBeenCalledWith(jobHistory);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const jobHistory = new JobHistoryMySuffix();
        spyOn(jobHistoryService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ jobHistory });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: jobHistory }));
        saveSubject.complete();

        // THEN
        expect(jobHistoryService.create).toHaveBeenCalledWith(jobHistory);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const jobHistory = { id: 'ABC' };
        spyOn(jobHistoryService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ jobHistory });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(jobHistoryService.update).toHaveBeenCalledWith(jobHistory);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackJobMySuffixById', () => {
        it('Should return tracked JobMySuffix primary key', () => {
          const entity = { id: 'ABC' };
          const trackResult = comp.trackJobMySuffixById(0, entity);
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

      describe('trackEmployeeMySuffixById', () => {
        it('Should return tracked EmployeeMySuffix primary key', () => {
          const entity = { id: 'ABC' };
          const trackResult = comp.trackEmployeeMySuffixById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
