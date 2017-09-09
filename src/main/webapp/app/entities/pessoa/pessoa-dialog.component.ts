import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Pessoa } from './pessoa.model';
import { PessoaPopupService } from './pessoa-popup.service';
import { PessoaService } from './pessoa.service';
import { Bairro, BairroService } from '../bairro';
import { Cidade, CidadeService } from '../cidade';
import { Estado, EstadoService } from '../estado';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pessoa-dialog',
    templateUrl: './pessoa-dialog.component.html'
})
export class PessoaDialogComponent implements OnInit {

    pessoa: Pessoa;
    isSaving: boolean;

    bairros: Bairro[];

    cidades: Cidade[];

    estados: Estado[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private alertService: JhiAlertService,
        private pessoaService: PessoaService,
        private bairroService: BairroService,
        private cidadeService: CidadeService,
        private estadoService: EstadoService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bairroService.query()
            .subscribe((res: ResponseWrapper) => { this.bairros = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.cidadeService.query()
            .subscribe((res: ResponseWrapper) => { this.cidades = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.estadoService.query()
            .subscribe((res: ResponseWrapper) => { this.estados = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.pessoa, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pessoa.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pessoaService.update(this.pessoa));
        } else {
            this.subscribeToSaveResponse(
                this.pessoaService.create(this.pessoa));
        }
    }

    private subscribeToSaveResponse(result: Observable<Pessoa>) {
        result.subscribe((res: Pessoa) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Pessoa) {
        this.eventManager.broadcast({ name: 'pessoaListModification', content: 'OK'});
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

    trackBairroById(index: number, item: Bairro) {
        return item.id;
    }

    trackCidadeById(index: number, item: Cidade) {
        return item.id;
    }

    trackEstadoById(index: number, item: Estado) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pessoa-popup',
    template: ''
})
export class PessoaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pessoaPopupService: PessoaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pessoaPopupService
                    .open(PessoaDialogComponent as Component, params['id']);
            } else {
                this.pessoaPopupService
                    .open(PessoaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
