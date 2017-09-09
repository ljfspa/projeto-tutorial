import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { Vermifugo } from './vermifugo.model';
import { VermifugoService } from './vermifugo.service';

@Component({
    selector: 'jhi-vermifugo-detail',
    templateUrl: './vermifugo-detail.component.html'
})
export class VermifugoDetailComponent implements OnInit, OnDestroy {

    vermifugo: Vermifugo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private vermifugoService: VermifugoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVermifugos();
    }

    load(id) {
        this.vermifugoService.find(id).subscribe((vermifugo) => {
            this.vermifugo = vermifugo;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVermifugos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vermifugoListModification',
            (response) => this.load(this.vermifugo.id)
        );
    }
}
