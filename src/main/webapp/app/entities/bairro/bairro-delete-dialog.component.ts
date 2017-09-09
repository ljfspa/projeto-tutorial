import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Bairro } from './bairro.model';
import { BairroPopupService } from './bairro-popup.service';
import { BairroService } from './bairro.service';

@Component({
    selector: 'jhi-bairro-delete-dialog',
    templateUrl: './bairro-delete-dialog.component.html'
})
export class BairroDeleteDialogComponent {

    bairro: Bairro;

    constructor(
        private bairroService: BairroService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bairroService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bairroListModification',
                content: 'Deleted an bairro'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bairro-delete-popup',
    template: ''
})
export class BairroDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bairroPopupService: BairroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bairroPopupService
                .open(BairroDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
