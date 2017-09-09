import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Raca } from './raca.model';
import { RacaPopupService } from './raca-popup.service';
import { RacaService } from './raca.service';

@Component({
    selector: 'jhi-raca-dialog',
    templateUrl: './raca-dialog.component.html'
})
export class RacaDialogComponent implements OnInit {

    raca: Raca;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private racaService: RacaService,
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
        if (this.raca.id !== undefined) {
            this.subscribeToSaveResponse(
                this.racaService.update(this.raca));
        } else {
            this.subscribeToSaveResponse(
                this.racaService.create(this.raca));
        }
    }

    private subscribeToSaveResponse(result: Observable<Raca>) {
        result.subscribe((res: Raca) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Raca) {
        this.eventManager.broadcast({ name: 'racaListModification', content: 'OK'});
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
    selector: 'jhi-raca-popup',
    template: ''
})
export class RacaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private racaPopupService: RacaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.racaPopupService
                    .open(RacaDialogComponent as Component, params['id']);
            } else {
                this.racaPopupService
                    .open(RacaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
