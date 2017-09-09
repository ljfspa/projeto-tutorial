import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Especie } from './especie.model';
import { EspeciePopupService } from './especie-popup.service';
import { EspecieService } from './especie.service';

@Component({
    selector: 'jhi-especie-dialog',
    templateUrl: './especie-dialog.component.html'
})
export class EspecieDialogComponent implements OnInit {

    especie: Especie;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private especieService: EspecieService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.especie.id !== undefined) {
            this.subscribeToSaveResponse(
                this.especieService.update(this.especie));
        } else {
            this.subscribeToSaveResponse(
                this.especieService.create(this.especie));
        }
    }

    private subscribeToSaveResponse(result: Observable<Especie>) {
        result.subscribe((res: Especie) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Especie) {
        this.eventManager.broadcast({ name: 'especieListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-especie-popup',
    template: ''
})
export class EspeciePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private especiePopupService: EspeciePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.especiePopupService
                    .open(EspecieDialogComponent as Component, params['id']);
            } else {
                this.especiePopupService
                    .open(EspecieDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
