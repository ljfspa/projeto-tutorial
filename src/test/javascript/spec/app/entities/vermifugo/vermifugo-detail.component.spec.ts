/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ClinicvetTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { VermifugoDetailComponent } from '../../../../../../main/webapp/app/entities/vermifugo/vermifugo-detail.component';
import { VermifugoService } from '../../../../../../main/webapp/app/entities/vermifugo/vermifugo.service';
import { Vermifugo } from '../../../../../../main/webapp/app/entities/vermifugo/vermifugo.model';

describe('Component Tests', () => {

    describe('Vermifugo Management Detail Component', () => {
        let comp: VermifugoDetailComponent;
        let fixture: ComponentFixture<VermifugoDetailComponent>;
        let service: VermifugoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ClinicvetTestModule],
                declarations: [VermifugoDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    VermifugoService,
                    JhiEventManager
                ]
            }).overrideTemplate(VermifugoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VermifugoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VermifugoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Vermifugo(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.vermifugo).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
