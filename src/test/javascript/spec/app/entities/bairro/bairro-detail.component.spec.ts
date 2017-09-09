/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ClinicvetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BairroDetailComponent } from '../../../../../../main/webapp/app/entities/bairro/bairro-detail.component';
import { BairroService } from '../../../../../../main/webapp/app/entities/bairro/bairro.service';
import { Bairro } from '../../../../../../main/webapp/app/entities/bairro/bairro.model';

describe('Component Tests', () => {

    describe('Bairro Management Detail Component', () => {
        let comp: BairroDetailComponent;
        let fixture: ComponentFixture<BairroDetailComponent>;
        let service: BairroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ClinicvetTestModule],
                declarations: [BairroDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BairroService,
                    JhiEventManager
                ]
            }).overrideTemplate(BairroDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BairroDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BairroService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Bairro(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.bairro).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
