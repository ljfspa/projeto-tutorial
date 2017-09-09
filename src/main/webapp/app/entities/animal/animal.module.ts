import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicvetSharedModule } from '../../shared';
import {
    AnimalService,
    AnimalPopupService,
    AnimalComponent,
    AnimalDetailComponent,
    AnimalDialogComponent,
    AnimalPopupComponent,
    AnimalDeletePopupComponent,
    AnimalDeleteDialogComponent,
    animalRoute,
    animalPopupRoute,
} from './';

const ENTITY_STATES = [
    ...animalRoute,
    ...animalPopupRoute,
];

@NgModule({
    imports: [
        ClinicvetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AnimalComponent,
        AnimalDetailComponent,
        AnimalDialogComponent,
        AnimalDeleteDialogComponent,
        AnimalPopupComponent,
        AnimalDeletePopupComponent,
    ],
    entryComponents: [
        AnimalComponent,
        AnimalDialogComponent,
        AnimalPopupComponent,
        AnimalDeleteDialogComponent,
        AnimalDeletePopupComponent,
    ],
    providers: [
        AnimalService,
        AnimalPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetAnimalModule {}
