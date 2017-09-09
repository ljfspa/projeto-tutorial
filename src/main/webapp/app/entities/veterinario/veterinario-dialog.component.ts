import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Veterinario } from './veterinario.model';
import { VeterinarioPopupService } from './veterinario-popup.service';
import { VeterinarioService } from './veterinario.service';
import { Pessoa, PessoaService } from '../pessoa';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-veterinario-dialog',
    templateUrl: './veterinario-dialog.component.html'
})
export class VeterinarioDialogComponent implements OnInit {

    veterinario: Veterinario;
    isSaving: boolean;

    pessoas: Pessoa[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private veterinarioService: VeterinarioService,
        private pessoaService: PessoaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pessoaService
            .query({filter: 'veterinario-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.veterinario.pessoa || !this.veterinario.pessoa.id) {
                    this.pessoas = res.json;
                } else {
                    this.pessoaService
                        .find(this.veterinario.pessoa.id)
                        .subscribe((subRes: Pessoa) => {
                            this.pessoas = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.veterinario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.veterinarioService.update(this.veterinario));
        } else {
            this.subscribeToSaveResponse(
                this.veterinarioService.create(this.veterinario));
        }
    }

    private subscribeToSaveResponse(result: Observable<Veterinario>) {
        result.subscribe((res: Veterinario) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Veterinario) {
        this.eventManager.broadcast({ name: 'veterinarioListModification', content: 'OK'});
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

    trackPessoaById(index: number, item: Pessoa) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-veterinario-popup',
    template: ''
})
export class VeterinarioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private veterinarioPopupService: VeterinarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.veterinarioPopupService
                    .open(VeterinarioDialogComponent as Component, params['id']);
            } else {
                this.veterinarioPopupService
                    .open(VeterinarioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
