import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Bairro } from './bairro.model';
import { BairroService } from './bairro.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-bairro',
    templateUrl: './bairro.component.html'
})
export class BairroComponent implements OnInit, OnDestroy {
bairros: Bairro[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bairroService: BairroService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bairroService.query().subscribe(
            (res: ResponseWrapper) => {
                this.bairros = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBairros();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Bairro) {
        return item.id;
    }
    registerChangeInBairros() {
        this.eventSubscriber = this.eventManager.subscribe('bairroListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
