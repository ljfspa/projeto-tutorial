import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Vacina } from './vacina.model';
import { VacinaService } from './vacina.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-vacina',
    templateUrl: './vacina.component.html'
})
export class VacinaComponent implements OnInit, OnDestroy {
vacinas: Vacina[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private vacinaService: VacinaService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.vacinaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.vacinas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVacinas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Vacina) {
        return item.id;
    }
    registerChangeInVacinas() {
        this.eventSubscriber = this.eventManager.subscribe('vacinaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
