import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Vacina } from './vacina.model';
import { VacinaPopupService } from './vacina-popup.service';
import { VacinaService } from './vacina.service';
import { Consulta, ConsultaService } from '../consulta';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-vacina-dialog',
    templateUrl: './vacina-dialog.component.html'
})
export class VacinaDialogComponent implements OnInit {

    vacina: Vacina;
    isSaving: boolean;

    consultas: Consulta[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private vacinaService: VacinaService,
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
        if (this.vacina.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vacinaService.update(this.vacina));
        } else {
            this.subscribeToSaveResponse(
                this.vacinaService.create(this.vacina));
        }
    }

    private subscribeToSaveResponse(result: Observable<Vacina>) {
        result.subscribe((res: Vacina) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Vacina) {
        this.eventManager.broadcast({ name: 'vacinaListModification', content: 'OK'});
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
    selector: 'jhi-vacina-popup',
    template: ''
})
export class VacinaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vacinaPopupService: VacinaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vacinaPopupService
                    .open(VacinaDialogComponent as Component, params['id']);
            } else {
                this.vacinaPopupService
                    .open(VacinaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
