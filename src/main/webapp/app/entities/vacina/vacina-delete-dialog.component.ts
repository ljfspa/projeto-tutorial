import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Vacina } from './vacina.model';
import { VacinaPopupService } from './vacina-popup.service';
import { VacinaService } from './vacina.service';

@Component({
    selector: 'jhi-vacina-delete-dialog',
    templateUrl: './vacina-delete-dialog.component.html'
})
export class VacinaDeleteDialogComponent {

    vacina: Vacina;

    constructor(
        private vacinaService: VacinaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vacinaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vacinaListModification',
                content: 'Deleted an vacina'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vacina-delete-popup',
    template: ''
})
export class VacinaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vacinaPopupService: VacinaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vacinaPopupService
                .open(VacinaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
