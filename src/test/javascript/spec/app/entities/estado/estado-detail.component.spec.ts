/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ClinicvetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { EstadoDetailComponent } from '../../../../../../main/webapp/app/entities/estado/estado-detail.component';
import { EstadoService } from '../../../../../../main/webapp/app/entities/estado/estado.service';
import { Estado } from '../../../../../../main/webapp/app/entities/estado/estado.model';

describe('Component Tests', () => {

    describe('Estado Management Detail Component', () => {
        let comp: EstadoDetailComponent;
        let fixture: ComponentFixture<EstadoDetailComponent>;
        let service: EstadoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ClinicvetTestModule],
                declarations: [EstadoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    EstadoService,
                    JhiEventManager
                ]
            }).overrideTemplate(EstadoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EstadoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EstadoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Estado(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.estado).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
