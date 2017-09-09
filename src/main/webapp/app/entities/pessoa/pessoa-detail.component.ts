import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { Pessoa } from './pessoa.model';
import { PessoaService } from './pessoa.service';

@Component({
    selector: 'jhi-pessoa-detail',
    templateUrl: './pessoa-detail.component.html'
})
export class PessoaDetailComponent implements OnInit, OnDestroy {

    pessoa: Pessoa;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private pessoaService: PessoaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPessoas();
    }

    load(id) {
        this.pessoaService.find(id).subscribe((pessoa) => {
            this.pessoa = pessoa;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPessoas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pessoaListModification',
            (response) => this.load(this.pessoa.id)
        );
    }
}
