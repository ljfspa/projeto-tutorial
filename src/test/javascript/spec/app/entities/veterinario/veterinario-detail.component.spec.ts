/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ClinicvetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { VeterinarioDetailComponent } from '../../../../../../main/webapp/app/entities/veterinario/veterinario-detail.component';
import { VeterinarioService } from '../../../../../../main/webapp/app/entities/veterinario/veterinario.service';
import { Veterinario } from '../../../../../../main/webapp/app/entities/veterinario/veterinario.model';

describe('Component Tests', () => {

    describe('Veterinario Management Detail Component', () => {
        let comp: VeterinarioDetailComponent;
        let fixture: ComponentFixture<VeterinarioDetailComponent>;
        let service: VeterinarioService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ClinicvetTestModule],
                declarations: [VeterinarioDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    VeterinarioService,
                    JhiEventManager
                ]
            }).overrideTemplate(VeterinarioDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VeterinarioDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VeterinarioService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Veterinario(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.veterinario).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
