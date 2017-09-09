import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Consulta } from './consulta.model';
import { ConsultaPopupService } from './consulta-popup.service';
import { ConsultaService } from './consulta.service';

@Component({
    selector: 'jhi-consulta-delete-dialog',
    templateUrl: './consulta-delete-dialog.component.html'
})
export class ConsultaDeleteDialogComponent {

    consulta: Consulta;

    constructor(
        private consultaService: ConsultaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.consultaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'consultaListModification',
                content: 'Deleted an consulta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-consulta-delete-popup',
    template: ''
})
export class ConsultaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private consultaPopupService: ConsultaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.consultaPopupService
                .open(ConsultaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
