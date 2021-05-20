jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { CountryMySuffixService } from '../service/country-my-suffix.service';

import { CountryMySuffixDeleteDialogComponent } from './country-my-suffix-delete-dialog.component';

describe('Component Tests', () => {
  describe('CountryMySuffix Management Delete Component', () => {
    let comp: CountryMySuffixDeleteDialogComponent;
    let fixture: ComponentFixture<CountryMySuffixDeleteDialogComponent>;
    let service: CountryMySuffixService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [CountryMySuffixDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(CountryMySuffixDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CountryMySuffixDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(CountryMySuffixService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete('ABC');
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith('ABC');
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
