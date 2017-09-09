import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tratamento } from './tratamento.model';
import { TratamentoPopupService } from './tratamento-popup.service';
import { TratamentoService } from './tratamento.service';
import { Consulta, ConsultaService } from '../consulta';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-tratamento-dialog',
    templateUrl: './tratamento-dialog.component.html'
})
export class TratamentoDialogComponent implements OnInit {

    tratamento: Tratamento;
    isSaving: boolean;

    consultas: Consulta[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private tratamentoService: TratamentoService,
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
        if (this.tratamento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tratamentoService.update(this.tratamento));
        } else {
            this.subscribeToSaveResponse(
                this.tratamentoService.create(this.tratamento));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tratamento>) {
        result.subscribe((res: Tratamento) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Tratamento) {
        this.eventManager.broadcast({ name: 'tratamentoListModification', content: 'OK'});
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
    selector: 'jhi-tratamento-popup',
    template: ''
})
export class TratamentoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tratamentoPopupService: TratamentoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tratamentoPopupService
                    .open(TratamentoDialogComponent as Component, params['id']);
            } else {
                this.tratamentoPopupService
                    .open(TratamentoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
