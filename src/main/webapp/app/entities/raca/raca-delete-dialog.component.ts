import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Raca } from './raca.model';
import { RacaPopupService } from './raca-popup.service';
import { RacaService } from './raca.service';

@Component({
    selector: 'jhi-raca-delete-dialog',
    templateUrl: './raca-delete-dialog.component.html'
})
export class RacaDeleteDialogComponent {

    raca: Raca;

    constructor(
        private racaService: RacaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.racaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'racaListModification',
                content: 'Deleted an raca'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-raca-delete-popup',
    template: ''
})
export class RacaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private racaPopupService: RacaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.racaPopupService
                .open(RacaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
