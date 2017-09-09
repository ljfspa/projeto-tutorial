/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ClinicvetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TratamentoDetailComponent } from '../../../../../../main/webapp/app/entities/tratamento/tratamento-detail.component';
import { TratamentoService } from '../../../../../../main/webapp/app/entities/tratamento/tratamento.service';
import { Tratamento } from '../../../../../../main/webapp/app/entities/tratamento/tratamento.model';

describe('Component Tests', () => {

    describe('Tratamento Management Detail Component', () => {
        let comp: TratamentoDetailComponent;
        let fixture: ComponentFixture<TratamentoDetailComponent>;
        let service: TratamentoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ClinicvetTestModule],
                declarations: [TratamentoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TratamentoService,
                    JhiEventManager
                ]
            }).overrideTemplate(TratamentoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TratamentoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TratamentoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Tratamento(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tratamento).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
