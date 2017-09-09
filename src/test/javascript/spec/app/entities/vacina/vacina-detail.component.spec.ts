/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ClinicvetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { VacinaDetailComponent } from '../../../../../../main/webapp/app/entities/vacina/vacina-detail.component';
import { VacinaService } from '../../../../../../main/webapp/app/entities/vacina/vacina.service';
import { Vacina } from '../../../../../../main/webapp/app/entities/vacina/vacina.model';

describe('Component Tests', () => {

    describe('Vacina Management Detail Component', () => {
        let comp: VacinaDetailComponent;
        let fixture: ComponentFixture<VacinaDetailComponent>;
        let service: VacinaService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ClinicvetTestModule],
                declarations: [VacinaDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    VacinaService,
                    JhiEventManager
                ]
            }).overrideTemplate(VacinaDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VacinaDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VacinaService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Vacina(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.vacina).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
