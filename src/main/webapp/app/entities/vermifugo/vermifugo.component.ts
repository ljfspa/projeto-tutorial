import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Vermifugo } from './vermifugo.model';
import { VermifugoService } from './vermifugo.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-vermifugo',
    templateUrl: './vermifugo.component.html'
})
export class VermifugoComponent implements OnInit, OnDestroy {
vermifugos: Vermifugo[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private vermifugoService: VermifugoService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.vermifugoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.vermifugos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVermifugos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Vermifugo) {
        return item.id;
    }
    registerChangeInVermifugos() {
        this.eventSubscriber = this.eventManager.subscribe('vermifugoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
