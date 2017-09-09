import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicvetSharedModule } from '../../shared';
import {
    FuncionarioService,
    FuncionarioPopupService,
    FuncionarioComponent,
    FuncionarioDetailComponent,
    FuncionarioDialogComponent,
    FuncionarioPopupComponent,
    FuncionarioDeletePopupComponent,
    FuncionarioDeleteDialogComponent,
    funcionarioRoute,
    funcionarioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...funcionarioRoute,
    ...funcionarioPopupRoute,
];

@NgModule({
    imports: [
        ClinicvetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FuncionarioComponent,
        FuncionarioDetailComponent,
        FuncionarioDialogComponent,
        FuncionarioDeleteDialogComponent,
        FuncionarioPopupComponent,
        FuncionarioDeletePopupComponent,
    ],
    entryComponents: [
        FuncionarioComponent,
        FuncionarioDialogComponent,
        FuncionarioPopupComponent,
        FuncionarioDeleteDialogComponent,
        FuncionarioDeletePopupComponent,
    ],
    providers: [
        FuncionarioService,
        FuncionarioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetFuncionarioModule {}
