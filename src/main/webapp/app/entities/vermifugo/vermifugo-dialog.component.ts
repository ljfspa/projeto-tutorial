import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Vermifugo } from './vermifugo.model';
import { VermifugoPopupService } from './vermifugo-popup.service';
import { VermifugoService } from './vermifugo.service';
import { Consulta, ConsultaService } from '../consulta';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-vermifugo-dialog',
    templateUrl: './vermifugo-dialog.component.html'
})
export class VermifugoDialogComponent implements OnInit {

    vermifugo: Vermifugo;
    isSaving: boolean;

    consultas: Consulta[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private vermifugoService: VermifugoService,
        private consultaService: ConsultaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.consultaService.query()
            .subscribe((res: ResponseWrapper) => { this.consultas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vermifugo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vermifugoService.update(this.vermifugo));
        } else {
            this.subscribeToSaveResponse(
                this.vermifugoService.create(this.vermifugo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Vermifugo>) {
        result.subscribe((res: Vermifugo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Vermifugo) {
        this.eventManager.broadcast({ name: 'vermifugoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackConsultaById(index: number, item: Consulta) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-vermifugo-popup',
    template: ''
})
export class VermifugoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vermifugoPopupService: VermifugoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vermifugoPopupService
                    .open(VermifugoDialogComponent as Component, params['id']);
            } else {
                this.vermifugoPopupService
                    .open(VermifugoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
