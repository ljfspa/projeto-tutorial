import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Veterinario } from './veterinario.model';
import { VeterinarioService } from './veterinario.service';

@Component({
    selector: 'jhi-veterinario-detail',
    templateUrl: './veterinario-detail.component.html'
})
export class VeterinarioDetailComponent implements OnInit, OnDestroy {

    veterinario: Veterinario;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private veterinarioService: VeterinarioService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVeterinarios();
    }

    load(id) {
        this.veterinarioService.find(id).subscribe((veterinario) => {
            this.veterinario = veterinario;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVeterinarios() {
        this.eventSubscriber = this.eventManager.subscribe(
            'veterinarioListModification',
            (response) => this.load(this.veterinario.id)
        );
    }
}
