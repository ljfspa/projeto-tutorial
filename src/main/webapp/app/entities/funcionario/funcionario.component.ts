import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Funcionario } from './funcionario.model';
import { FuncionarioService } from './funcionario.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-funcionario',
    templateUrl: './funcionario.component.html'
})
export class FuncionarioComponent implements OnInit, OnDestroy {
funcionarios: Funcionario[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private funcionarioService: FuncionarioService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.funcionarioService.query().subscribe(
            (res: ResponseWrapper) => {
                this.funcionarios = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFuncionarios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Funcionario) {
        return item.id;
    }
    registerChangeInFuncionarios() {
        this.eventSubscriber = this.eventManager.subscribe('funcionarioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
