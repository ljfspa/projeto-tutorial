import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicvetSharedModule } from '../../shared';
import {
    BairroService,
    BairroPopupService,
    BairroComponent,
    BairroDetailComponent,
    BairroDialogComponent,
    BairroPopupComponent,
    BairroDeletePopupComponent,
    BairroDeleteDialogComponent,
    bairroRoute,
    bairroPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bairroRoute,
    ...bairroPopupRoute,
];

@NgModule({
    imports: [
        ClinicvetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BairroComponent,
        BairroDetailComponent,
        BairroDialogComponent,
        BairroDeleteDialogComponent,
        BairroPopupComponent,
        BairroDeletePopupComponent,
    ],
    entryComponents: [
        BairroComponent,
        BairroDialogComponent,
        BairroPopupComponent,
        BairroDeleteDialogComponent,
        BairroDeletePopupComponent,
    ],
    providers: [
        BairroService,
        BairroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetBairroModule {}
