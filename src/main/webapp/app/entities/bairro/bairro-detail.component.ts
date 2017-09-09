import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Bairro } from './bairro.model';
import { BairroService } from './bairro.service';

@Component({
    selector: 'jhi-bairro-detail',
    templateUrl: './bairro-detail.component.html'
})
export class BairroDetailComponent implements OnInit, OnDestroy {

    bairro: Bairro;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bairroService: BairroService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBairros();
    }

    load(id) {
        this.bairroService.find(id).subscribe((bairro) => {
            this.bairro = bairro;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBairros() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bairroListModification',
            (response) => this.load(this.bairro.id)
        );
    }
}
