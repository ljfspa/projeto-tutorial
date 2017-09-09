import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicvetSharedModule } from '../../shared';
import {
    TratamentoService,
    TratamentoPopupService,
    TratamentoComponent,
    TratamentoDetailComponent,
    TratamentoDialogComponent,
    TratamentoPopupComponent,
    TratamentoDeletePopupComponent,
    TratamentoDeleteDialogComponent,
    tratamentoRoute,
    tratamentoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tratamentoRoute,
    ...tratamentoPopupRoute,
];

@NgModule({
    imports: [
        ClinicvetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TratamentoComponent,
        TratamentoDetailComponent,
        TratamentoDialogComponent,
        TratamentoDeleteDialogComponent,
        TratamentoPopupComponent,
        TratamentoDeletePopupComponent,
    ],
    entryComponents: [
        TratamentoComponent,
        TratamentoDialogComponent,
        TratamentoPopupComponent,
        TratamentoDeleteDialogComponent,
        TratamentoDeletePopupComponent,
    ],
    providers: [
        TratamentoService,
        TratamentoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetTratamentoModule {}
