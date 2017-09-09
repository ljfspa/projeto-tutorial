import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Servico } from './servico.model';
import { ServicoPopupService } from './servico-popup.service';
import { ServicoService } from './servico.service';
import { Agendamento, AgendamentoService } from '../agendamento';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-servico-dialog',
    templateUrl: './servico-dialog.component.html'
})
export class ServicoDialogComponent implements OnInit {

    servico: Servico;
    isSaving: boolean;

    agendamentos: Agendamento[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private servicoService: ServicoService,
        private agendamentoService: AgendamentoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.agendamentoService.query()
            .subscribe((res: ResponseWrapper) => { this.agendamentos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.servico.id !== undefined) {
            this.subscribeToSaveResponse(
                this.servicoService.update(this.servico));
        } else {
            this.subscribeToSaveResponse(
                this.servicoService.create(this.servico));
        }
    }

    private subscribeToSaveResponse(result: Observable<Servico>) {
        result.subscribe((res: Servico) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Servico) {
        this.eventManager.broadcast({ name: 'servicoListModification', content: 'OK'});
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

    trackAgendamentoById(index: number, item: Agendamento) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-servico-popup',
    template: ''
})
export class ServicoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private servicoPopupService: ServicoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.servicoPopupService
                    .open(ServicoDialogComponent as Component, params['id']);
            } else {
                this.servicoPopupService
                    .open(ServicoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
