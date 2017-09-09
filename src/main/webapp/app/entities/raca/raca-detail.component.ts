import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Raca } from './raca.model';
import { RacaService } from './raca.service';

@Component({
    selector: 'jhi-raca-detail',
    templateUrl: './raca-detail.component.html'
})
export class RacaDetailComponent implements OnInit, OnDestroy {

    raca: Raca;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private racaService: RacaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRacas();
    }

    load(id) {
        this.racaService.find(id).subscribe((raca) => {
            this.raca = raca;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRacas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'racaListModification',
            (response) => this.load(this.raca.id)
        );
    }
}
