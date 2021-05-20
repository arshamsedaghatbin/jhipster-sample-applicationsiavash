import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TaskMySuffixService } from '../service/task-my-suffix.service';

import { TaskMySuffixComponent } from './task-my-suffix.component';

describe('Component Tests', () => {
  describe('TaskMySuffix Management Component', () => {
    let comp: TaskMySuffixComponent;
    let fixture: ComponentFixture<TaskMySuffixComponent>;
    let service: TaskMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [TaskMySuffixComponent],
      })
        .overrideTemplate(TaskMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TaskMySuffixComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(TaskMySuffixService);

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
      expect(comp.tasks?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
