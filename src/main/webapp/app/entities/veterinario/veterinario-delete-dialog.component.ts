import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Veterinario } from './veterinario.model';
import { VeterinarioPopupService } from './veterinario-popup.service';
import { VeterinarioService } from './veterinario.service';

@Component({
    selector: 'jhi-veterinario-delete-dialog',
    templateUrl: './veterinario-delete-dialog.component.html'
})
export class VeterinarioDeleteDialogComponent {

    veterinario: Veterinario;

    constructor(
        private veterinarioService: VeterinarioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.veterinarioService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'veterinarioListModification',
                content: 'Deleted an veterinario'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-veterinario-delete-popup',
    template: ''
})
export class VeterinarioDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private veterinarioPopupService: VeterinarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.veterinarioPopupService
                .open(VeterinarioDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
