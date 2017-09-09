import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicvetSharedModule } from '../../shared';
import {
    CidadeService,
    CidadePopupService,
    CidadeComponent,
    CidadeDetailComponent,
    CidadeDialogComponent,
    CidadePopupComponent,
    CidadeDeletePopupComponent,
    CidadeDeleteDialogComponent,
    cidadeRoute,
    cidadePopupRoute,
} from './';

const ENTITY_STATES = [
    ...cidadeRoute,
    ...cidadePopupRoute,
];

@NgModule({
    imports: [
        ClinicvetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CidadeComponent,
        CidadeDetailComponent,
        CidadeDialogComponent,
        CidadeDeleteDialogComponent,
        CidadePopupComponent,
        CidadeDeletePopupComponent,
    ],
    entryComponents: [
        CidadeComponent,
        CidadeDialogComponent,
        CidadePopupComponent,
        CidadeDeleteDialogComponent,
        CidadeDeletePopupComponent,
    ],
    providers: [
        CidadeService,
        CidadePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetCidadeModule {}
