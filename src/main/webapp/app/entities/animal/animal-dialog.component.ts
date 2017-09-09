import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { Animal } from './animal.model';
import { AnimalPopupService } from './animal-popup.service';
import { AnimalService } from './animal.service';
import { Raca, RacaService } from '../raca';
import { Especie, EspecieService } from '../especie';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-animal-dialog',
    templateUrl: './animal-dialog.component.html'
})
export class AnimalDialogComponent implements OnInit {

    animal: Animal;
    isSaving: boolean;

    racas: Raca[];

    especies: Especie[];
    nascimentoDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private alertService: JhiAlertService,
        private animalService: AnimalService,
        private racaService: RacaService,
        private especieService: EspecieService,
        private elementRef: ElementRef,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.racaService
            .query({filter: 'animal-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.animal.raca || !this.animal.raca.id) {
                    this.racas = res.json;
                } else {
                    this.racaService
                        .find(this.animal.raca.id)
                        .subscribe((subRes: Raca) => {
                            this.racas = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.especieService
            .query({filter: 'animal-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.animal.especie || !this.animal.especie.id) {
                    this.especies = res.json;
                } else {
                    this.especieService
                        .find(this.animal.especie.id)
                        .subscribe((subRes: Especie) => {
                            this.especies = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
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
        this.dataUtils.clearInputImage(this.animal, this.elementRef, field, fieldContentType, idInput);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.animal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.animalService.update(this.animal));
        } else {
            this.subscribeToSaveResponse(
                this.animalService.create(this.animal));
        }
    }

    private subscribeToSaveResponse(result: Observable<Animal>) {
        result.subscribe((res: Animal) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Animal) {
        this.eventManager.broadcast({ name: 'animalListModification', content: 'OK'});
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

    trackRacaById(index: number, item: Raca) {
        return item.id;
    }

    trackEspecieById(index: number, item: Especie) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-animal-popup',
    template: ''
})
export class AnimalPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private animalPopupService: AnimalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.animalPopupService
                    .open(AnimalDialogComponent as Component, params['id']);
            } else {
                this.animalPopupService
                    .open(AnimalDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
