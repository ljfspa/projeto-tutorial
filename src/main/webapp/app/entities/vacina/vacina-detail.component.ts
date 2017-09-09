import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Vacina } from './vacina.model';
import { VacinaService } from './vacina.service';

@Component({
    selector: 'jhi-vacina-detail',
    templateUrl: './vacina-detail.component.html'
})
export class VacinaDetailComponent implements OnInit, OnDestroy {

    vacina: Vacina;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private vacinaService: VacinaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVacinas();
    }

    load(id) {
        this.vacinaService.find(id).subscribe((vacina) => {
            this.vacina = vacina;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVacinas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vacinaListModification',
            (response) => this.load(this.vacina.id)
        );
    }
}
