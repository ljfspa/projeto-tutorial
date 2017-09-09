import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Consulta } from './consulta.model';
import { ConsultaService } from './consulta.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-consulta',
    templateUrl: './consulta.component.html'
})
export class ConsultaComponent implements OnInit, OnDestroy {
consultas: Consulta[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private consultaService: ConsultaService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.consultaService.query().subscribe(
            (res: ResponseWrapper) => {
                this.consultas = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInConsultas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Consulta) {
        return item.id;
    }
    registerChangeInConsultas() {
        this.eventSubscriber = this.eventManager.subscribe('consultaListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
