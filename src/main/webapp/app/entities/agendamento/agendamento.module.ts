import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicvetSharedModule } from '../../shared';
import {
    AgendamentoService,
    AgendamentoPopupService,
    AgendamentoComponent,
    AgendamentoDetailComponent,
    AgendamentoDialogComponent,
    AgendamentoPopupComponent,
    AgendamentoDeletePopupComponent,
    AgendamentoDeleteDialogComponent,
    agendamentoRoute,
    agendamentoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...agendamentoRoute,
    ...agendamentoPopupRoute,
];

@NgModule({
    imports: [
        ClinicvetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AgendamentoComponent,
        AgendamentoDetailComponent,
        AgendamentoDialogComponent,
        AgendamentoDeleteDialogComponent,
        AgendamentoPopupComponent,
        AgendamentoDeletePopupComponent,
    ],
    entryComponents: [
        AgendamentoComponent,
        AgendamentoDialogComponent,
        AgendamentoPopupComponent,
        AgendamentoDeleteDialogComponent,
        AgendamentoDeletePopupComponent,
    ],
    providers: [
        AgendamentoService,
        AgendamentoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetAgendamentoModule {}
