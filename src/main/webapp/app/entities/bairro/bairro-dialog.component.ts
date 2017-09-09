import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Bairro } from './bairro.model';
import { BairroPopupService } from './bairro-popup.service';
import { BairroService } from './bairro.service';

@Component({
    selector: 'jhi-bairro-dialog',
    templateUrl: './bairro-dialog.component.html'
})
export class BairroDialogComponent implements OnInit {

    bairro: Bairro;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private bairroService: BairroService,
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
        if (this.bairro.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bairroService.update(this.bairro));
        } else {
            this.subscribeToSaveResponse(
                this.bairroService.create(this.bairro));
        }
    }

    private subscribeToSaveResponse(result: Observable<Bairro>) {
        result.subscribe((res: Bairro) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Bairro) {
        this.eventManager.broadcast({ name: 'bairroListModification', content: 'OK'});
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
    selector: 'jhi-bairro-popup',
    template: ''
})
export class BairroPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bairroPopupService: BairroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bairroPopupService
                    .open(BairroDialogComponent as Component, params['id']);
            } else {
                this.bairroPopupService
                    .open(BairroDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
