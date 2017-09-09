import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Agendamento } from './agendamento.model';
import { AgendamentoService } from './agendamento.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-agendamento',
    templateUrl: './agendamento.component.html'
})
export class AgendamentoComponent implements OnInit, OnDestroy {
agendamentos: Agendamento[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private agendamentoService: AgendamentoService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.agendamentoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.agendamentos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAgendamentos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Agendamento) {
        return item.id;
    }
    registerChangeInAgendamentos() {
        this.eventSubscriber = this.eventManager.subscribe('agendamentoListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
