import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Especie } from './especie.model';
import { EspeciePopupService } from './especie-popup.service';
import { EspecieService } from './especie.service';

@Component({
    selector: 'jhi-especie-delete-dialog',
    templateUrl: './especie-delete-dialog.component.html'
})
export class EspecieDeleteDialogComponent {

    especie: Especie;

    constructor(
        private especieService: EspecieService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.especieService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'especieListModification',
                content: 'Deleted an especie'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-especie-delete-popup',
    template: ''
})
export class EspecieDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private especiePopupService: EspeciePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.especiePopupService
                .open(EspecieDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
