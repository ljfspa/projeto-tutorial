import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Cidade } from './cidade.model';
import { CidadeService } from './cidade.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-cidade',
    templateUrl: './cidade.component.html'
})
export class CidadeComponent implements OnInit, OnDestroy {
cidades: Cidade[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cidadeService: CidadeService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cidadeService.query().subscribe(
            (res: ResponseWrapper) => {
                this.cidades = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCidades();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Cidade) {
        return item.id;
    }
    registerChangeInCidades() {
        this.eventSubscriber = this.eventManager.subscribe('cidadeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
