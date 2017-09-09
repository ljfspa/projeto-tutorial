import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Consulta } from './consulta.model';
import { ConsultaService } from './consulta.service';

@Component({
    selector: 'jhi-consulta-detail',
    templateUrl: './consulta-detail.component.html'
})
export class ConsultaDetailComponent implements OnInit, OnDestroy {

    consulta: Consulta;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private consultaService: ConsultaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInConsultas();
    }

    load(id) {
        this.consultaService.find(id).subscribe((consulta) => {
            this.consulta = consulta;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConsultas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'consultaListModification',
            (response) => this.load(this.consulta.id)
        );
    }
}
