import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicvetSharedModule } from '../../shared';
import {
    EspecieService,
    EspeciePopupService,
    EspecieComponent,
    EspecieDetailComponent,
    EspecieDialogComponent,
    EspeciePopupComponent,
    EspecieDeletePopupComponent,
    EspecieDeleteDialogComponent,
    especieRoute,
    especiePopupRoute,
} from './';

const ENTITY_STATES = [
    ...especieRoute,
    ...especiePopupRoute,
];

@NgModule({
    imports: [
        ClinicvetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EspecieComponent,
        EspecieDetailComponent,
        EspecieDialogComponent,
        EspecieDeleteDialogComponent,
        EspeciePopupComponent,
        EspecieDeletePopupComponent,
    ],
    entryComponents: [
        EspecieComponent,
        EspecieDialogComponent,
        EspeciePopupComponent,
        EspecieDeleteDialogComponent,
        EspecieDeletePopupComponent,
    ],
    providers: [
        EspecieService,
        EspeciePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetEspecieModule {}
