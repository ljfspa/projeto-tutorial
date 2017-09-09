import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Funcionario } from './funcionario.model';
import { FuncionarioPopupService } from './funcionario-popup.service';
import { FuncionarioService } from './funcionario.service';
import { Pessoa, PessoaService } from '../pessoa';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-funcionario-dialog',
    templateUrl: './funcionario-dialog.component.html'
})
export class FuncionarioDialogComponent implements OnInit {

    funcionario: Funcionario;
    isSaving: boolean;

    pessoas: Pessoa[];

    funcionarios: Funcionario[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private funcionarioService: FuncionarioService,
        private pessoaService: PessoaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.pessoaService
            .query({filter: 'funcionario-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.funcionario.pessoa || !this.funcionario.pessoa.id) {
                    this.pessoas = res.json;
                } else {
                    this.pessoaService
                        .find(this.funcionario.pessoa.id)
                        .subscribe((subRes: Pessoa) => {
                            this.pessoas = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.funcionarioService.query()
            .subscribe((res: ResponseWrapper) => { this.funcionarios = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.funcionario.id !== undefined) {
            this.subscribeToSaveResponse(
                this.funcionarioService.update(this.funcionario));
        } else {
            this.subscribeToSaveResponse(
                this.funcionarioService.create(this.funcionario));
        }
    }

    private subscribeToSaveResponse(result: Observable<Funcionario>) {
        result.subscribe((res: Funcionario) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Funcionario) {
        this.eventManager.broadcast({ name: 'funcionarioListModification', content: 'OK'});
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

    trackFuncionarioById(index: number, item: Funcionario) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-funcionario-popup',
    template: ''
})
export class FuncionarioPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private funcionarioPopupService: FuncionarioPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.funcionarioPopupService
                    .open(FuncionarioDialogComponent as Component, params['id']);
            } else {
                this.funcionarioPopupService
                    .open(FuncionarioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
