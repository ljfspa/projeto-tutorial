import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Tratamento } from './tratamento.model';
import { TratamentoService } from './tratamento.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-tratamento',
    templateUrl: './tratamento.component.html'
})
export class TratamentoComponent implements OnInit, OnDestroy {
tratamentos: Tratamento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private tratamentoService: TratamentoService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.tratamentoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.tratamentos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTratamentos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Tratamento) {
        return item.id;
    }
    registerChangeInTratamentos() {
        this.eventSubscriber = this.eventManager.subscribe('tratamentoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
