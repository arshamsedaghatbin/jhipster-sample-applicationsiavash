import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { RegionMySuffixService } from '../service/region-my-suffix.service';

import { RegionMySuffixComponent } from './region-my-suffix.component';

describe('Component Tests', () => {
  describe('RegionMySuffix Management Component', () => {
    let comp: RegionMySuffixComponent;
    let fixture: ComponentFixture<RegionMySuffixComponent>;
    let service: RegionMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [RegionMySuffixComponent],
      })
        .overrideTemplate(RegionMySuffixComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RegionMySuffixComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(RegionMySuffixService);

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
      expect(comp.regions?.[0]).toEqual(jasmine.objectContaining({ id: 'ABC' }));
    });
  });
});
