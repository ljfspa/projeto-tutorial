import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Estado } from './estado.model';
import { EstadoService } from './estado.service';

@Component({
    selector: 'jhi-estado-detail',
    templateUrl: './estado-detail.component.html'
})
export class EstadoDetailComponent implements OnInit, OnDestroy {

    estado: Estado;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private estadoService: EstadoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInEstados();
    }

    load(id) {
        this.estadoService.find(id).subscribe((estado) => {
            this.estado = estado;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInEstados() {
        this.eventSubscriber = this.eventManager.subscribe(
            'estadoListModification',
            (response) => this.load(this.estado.id)
        );
    }
}
