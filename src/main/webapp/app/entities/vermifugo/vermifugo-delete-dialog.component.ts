import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Vermifugo } from './vermifugo.model';
import { VermifugoPopupService } from './vermifugo-popup.service';
import { VermifugoService } from './vermifugo.service';

@Component({
    selector: 'jhi-vermifugo-delete-dialog',
    templateUrl: './vermifugo-delete-dialog.component.html'
})
export class VermifugoDeleteDialogComponent {

    vermifugo: Vermifugo;

    constructor(
        private vermifugoService: VermifugoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vermifugoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vermifugoListModification',
                content: 'Deleted an vermifugo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vermifugo-delete-popup',
    template: ''
})
export class VermifugoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vermifugoPopupService: VermifugoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vermifugoPopupService
                .open(VermifugoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
