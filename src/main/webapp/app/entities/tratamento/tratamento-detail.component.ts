import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Tratamento } from './tratamento.model';
import { TratamentoService } from './tratamento.service';

@Component({
    selector: 'jhi-tratamento-detail',
    templateUrl: './tratamento-detail.component.html'
})
export class TratamentoDetailComponent implements OnInit, OnDestroy {

    tratamento: Tratamento;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tratamentoService: TratamentoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTratamentos();
    }

    load(id) {
        this.tratamentoService.find(id).subscribe((tratamento) => {
            this.tratamento = tratamento;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTratamentos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'tratamentoListModification',
            (response) => this.load(this.tratamento.id)
        );
    }
}
