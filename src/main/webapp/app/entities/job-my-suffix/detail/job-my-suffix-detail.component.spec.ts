import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JobMySuffixDetailComponent } from './job-my-suffix-detail.component';

describe('Component Tests', () => {
  describe('JobMySuffix Management Detail Component', () => {
    let comp: JobMySuffixDetailComponent;
    let fixture: ComponentFixture<JobMySuffixDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [JobMySuffixDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ job: { id: 'ABC' } }) },
          },
        ],
      })
        .overrideTemplate(JobMySuffixDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(JobMySuffixDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load job on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.job).toEqual(jasmine.objectContaining({ id: 'ABC' }));
      });
    });
  });
});
