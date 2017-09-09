/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ClinicvetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EspecieDetailComponent } from '../../../../../../main/webapp/app/entities/especie/especie-detail.component';
import { EspecieService } from '../../../../../../main/webapp/app/entities/especie/especie.service';
import { Especie } from '../../../../../../main/webapp/app/entities/especie/especie.model';

describe('Component Tests', () => {

    describe('Especie Management Detail Component', () => {
        let comp: EspecieDetailComponent;
        let fixture: ComponentFixture<EspecieDetailComponent>;
        let service: EspecieService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ClinicvetTestModule],
                declarations: [EspecieDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EspecieService,
                    JhiEventManager
                ]
            }).overrideTemplate(EspecieDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EspecieDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EspecieService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Especie(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.especie).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
