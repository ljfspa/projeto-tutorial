import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicvetSharedModule } from '../../shared';
import {
    EstadoService,
    EstadoPopupService,
    EstadoComponent,
    EstadoDetailComponent,
    EstadoDialogComponent,
    EstadoPopupComponent,
    EstadoDeletePopupComponent,
    EstadoDeleteDialogComponent,
    estadoRoute,
    estadoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...estadoRoute,
    ...estadoPopupRoute,
];

@NgModule({
    imports: [
        ClinicvetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EstadoComponent,
        EstadoDetailComponent,
        EstadoDialogComponent,
        EstadoDeleteDialogComponent,
        EstadoPopupComponent,
        EstadoDeletePopupComponent,
    ],
    entryComponents: [
        EstadoComponent,
        EstadoDialogComponent,
        EstadoPopupComponent,
        EstadoDeleteDialogComponent,
        EstadoDeletePopupComponent,
    ],
    providers: [
        EstadoService,
        EstadoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetEstadoModule {}
