import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tratamento } from './tratamento.model';
import { TratamentoPopupService } from './tratamento-popup.service';
import { TratamentoService } from './tratamento.service';

@Component({
    selector: 'jhi-tratamento-delete-dialog',
    templateUrl: './tratamento-delete-dialog.component.html'
})
export class TratamentoDeleteDialogComponent {

    tratamento: Tratamento;

    constructor(
        private tratamentoService: TratamentoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tratamentoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tratamentoListModification',
                content: 'Deleted an tratamento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tratamento-delete-popup',
    template: ''
})
export class TratamentoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tratamentoPopupService: TratamentoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tratamentoPopupService
                .open(TratamentoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
