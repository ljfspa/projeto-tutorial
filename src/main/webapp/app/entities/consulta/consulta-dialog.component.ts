import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Consulta } from './consulta.model';
import { ConsultaPopupService } from './consulta-popup.service';
import { ConsultaService } from './consulta.service';
import { Agendamento, AgendamentoService } from '../agendamento';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-consulta-dialog',
    templateUrl: './consulta-dialog.component.html'
})
export class ConsultaDialogComponent implements OnInit {

    consulta: Consulta;
    isSaving: boolean;

    agendamentos: Agendamento[];
    dataConsultaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private consultaService: ConsultaService,
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
        if (this.consulta.id !== undefined) {
            this.subscribeToSaveResponse(
                this.consultaService.update(this.consulta));
        } else {
            this.subscribeToSaveResponse(
                this.consultaService.create(this.consulta));
        }
    }

    private subscribeToSaveResponse(result: Observable<Consulta>) {
        result.subscribe((res: Consulta) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Consulta) {
        this.eventManager.broadcast({ name: 'consultaListModification', content: 'OK'});
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
    selector: 'jhi-consulta-popup',
    template: ''
})
export class ConsultaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private consultaPopupService: ConsultaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.consultaPopupService
                    .open(ConsultaDialogComponent as Component, params['id']);
            } else {
                this.consultaPopupService
                    .open(ConsultaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
