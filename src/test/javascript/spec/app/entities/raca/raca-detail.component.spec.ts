/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ClinicvetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RacaDetailComponent } from '../../../../../../main/webapp/app/entities/raca/raca-detail.component';
import { RacaService } from '../../../../../../main/webapp/app/entities/raca/raca.service';
import { Raca } from '../../../../../../main/webapp/app/entities/raca/raca.model';

describe('Component Tests', () => {

    describe('Raca Management Detail Component', () => {
        let comp: RacaDetailComponent;
        let fixture: ComponentFixture<RacaDetailComponent>;
        let service: RacaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ClinicvetTestModule],
                declarations: [RacaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RacaService,
                    JhiEventManager
                ]
            }).overrideTemplate(RacaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RacaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RacaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Raca(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.raca).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
