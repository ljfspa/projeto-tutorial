import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { Veterinario } from './veterinario.model';
import { VeterinarioService } from './veterinario.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-veterinario',
    templateUrl: './veterinario.component.html'
})
export class VeterinarioComponent implements OnInit, OnDestroy {
veterinarios: Veterinario[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private veterinarioService: VeterinarioService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.veterinarioService.query().subscribe(
            (res: ResponseWrapper) => {
                this.veterinarios = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVeterinarios();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Veterinario) {
        return item.id;
    }
    registerChangeInVeterinarios() {
        this.eventSubscriber = this.eventManager.subscribe('veterinarioListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
