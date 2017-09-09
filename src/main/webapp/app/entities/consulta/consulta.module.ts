import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicvetSharedModule } from '../../shared';
import {
    ConsultaService,
    ConsultaPopupService,
    ConsultaComponent,
    ConsultaDetailComponent,
    ConsultaDialogComponent,
    ConsultaPopupComponent,
    ConsultaDeletePopupComponent,
    ConsultaDeleteDialogComponent,
    consultaRoute,
    consultaPopupRoute,
} from './';

const ENTITY_STATES = [
    ...consultaRoute,
    ...consultaPopupRoute,
];

@NgModule({
    imports: [
        ClinicvetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ConsultaComponent,
        ConsultaDetailComponent,
        ConsultaDialogComponent,
        ConsultaDeleteDialogComponent,
        ConsultaPopupComponent,
        ConsultaDeletePopupComponent,
    ],
    entryComponents: [
        ConsultaComponent,
        ConsultaDialogComponent,
        ConsultaPopupComponent,
        ConsultaDeleteDialogComponent,
        ConsultaDeletePopupComponent,
    ],
    providers: [
        ConsultaService,
        ConsultaPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetConsultaModule {}
