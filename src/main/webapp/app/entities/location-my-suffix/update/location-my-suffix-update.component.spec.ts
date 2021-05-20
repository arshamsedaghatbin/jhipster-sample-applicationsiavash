jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { LocationMySuffixService } from '../service/location-my-suffix.service';
import { ILocationMySuffix, LocationMySuffix } from '../location-my-suffix.model';
import { ICountryMySuffix } from 'app/entities/country-my-suffix/country-my-suffix.model';
import { CountryMySuffixService } from 'app/entities/country-my-suffix/service/country-my-suffix.service';

import { LocationMySuffixUpdateComponent } from './location-my-suffix-update.component';

describe('Component Tests', () => {
  describe('LocationMySuffix Management Update Component', () => {
    let comp: LocationMySuffixUpdateComponent;
    let fixture: ComponentFixture<LocationMySuffixUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let locationService: LocationMySuffixService;
    let countryService: CountryMySuffixService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [LocationMySuffixUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(LocationMySuffixUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LocationMySuffixUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      locationService = TestBed.inject(LocationMySuffixService);
      countryService = TestBed.inject(CountryMySuffixService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call country query and add missing value', () => {
        const location: ILocationMySuffix = { id: 'CBA' };
        const country: ICountryMySuffix = { id: 'Hill extend wireless' };
        location.country = country;

        const countryCollection: ICountryMySuffix[] = [{ id: 'integrate Small Personal' }];
        spyOn(countryService, 'query').and.returnValue(of(new HttpResponse({ body: countryCollection })));
        const expectedCollection: ICountryMySuffix[] = [country, ...countryCollection];
        spyOn(countryService, 'addCountryMySuffixToCollectionIfMissing').and.returnValue(expectedCollection);

        activatedRoute.data = of({ location });
        comp.ngOnInit();

        expect(countryService.query).toHaveBeenCalled();
        expect(countryService.addCountryMySuffixToCollectionIfMissing).toHaveBeenCalledWith(countryCollection, country);
        expect(comp.countriesCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const location: ILocationMySuffix = { id: 'CBA' };
        const country: ICountryMySuffix = { id: 'Uganda' };
        location.country = country;

        activatedRoute.data = of({ location });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(location));
        expect(comp.countriesCollection).toContain(country);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const location = { id: 'ABC' };
        spyOn(locationService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ location });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: location }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(locationService.update).toHaveBeenCalledWith(location);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject();
        const location = new LocationMySuffix();
        spyOn(locationService, 'create').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ location });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: location }));
        saveSubject.complete();

        // THEN
        expect(locationService.create).toHaveBeenCalledWith(location);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject();
        const location = { id: 'ABC' };
        spyOn(locationService, 'update').and.returnValue(saveSubject);
        spyOn(comp, 'previousState');
        activatedRoute.data = of({ location });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(locationService.update).toHaveBeenCalledWith(location);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackCountryMySuffixById', () => {
        it('Should return tracked CountryMySuffix primary key', () => {
          const entity = { id: 'ABC' };
          const trackResult = comp.trackCountryMySuffixById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
