import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicvetSharedModule } from '../../shared';
import {
    VacinaService,
    VacinaPopupService,
    VacinaComponent,
    VacinaDetailComponent,
    VacinaDialogComponent,
    VacinaPopupComponent,
    VacinaDeletePopupComponent,
    VacinaDeleteDialogComponent,
    vacinaRoute,
    vacinaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...vacinaRoute,
    ...vacinaPopupRoute,
];

@NgModule({
    imports: [
        ClinicvetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VacinaComponent,
        VacinaDetailComponent,
        VacinaDialogComponent,
        VacinaDeleteDialogComponent,
        VacinaPopupComponent,
        VacinaDeletePopupComponent,
    ],
    entryComponents: [
        VacinaComponent,
        VacinaDialogComponent,
        VacinaPopupComponent,
        VacinaDeleteDialogComponent,
        VacinaDeletePopupComponent,
    ],
    providers: [
        VacinaService,
        VacinaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetVacinaModule {}
