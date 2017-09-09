/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ClinicvetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ConsultaDetailComponent } from '../../../../../../main/webapp/app/entities/consulta/consulta-detail.component';
import { ConsultaService } from '../../../../../../main/webapp/app/entities/consulta/consulta.service';
import { Consulta } from '../../../../../../main/webapp/app/entities/consulta/consulta.model';

describe('Component Tests', () => {

    describe('Consulta Management Detail Component', () => {
        let comp: ConsultaDetailComponent;
        let fixture: ComponentFixture<ConsultaDetailComponent>;
        let service: ConsultaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ClinicvetTestModule],
                declarations: [ConsultaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ConsultaService,
                    JhiEventManager
                ]
            }).overrideTemplate(ConsultaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConsultaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsultaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Consulta(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.consulta).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
