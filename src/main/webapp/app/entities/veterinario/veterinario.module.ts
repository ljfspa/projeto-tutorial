import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicvetSharedModule } from '../../shared';
import {
    VeterinarioService,
    VeterinarioPopupService,
    VeterinarioComponent,
    VeterinarioDetailComponent,
    VeterinarioDialogComponent,
    VeterinarioPopupComponent,
    VeterinarioDeletePopupComponent,
    VeterinarioDeleteDialogComponent,
    veterinarioRoute,
    veterinarioPopupRoute,
} from './';

const ENTITY_STATES = [
    ...veterinarioRoute,
    ...veterinarioPopupRoute,
];

@NgModule({
    imports: [
        ClinicvetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VeterinarioComponent,
        VeterinarioDetailComponent,
        VeterinarioDialogComponent,
        VeterinarioDeleteDialogComponent,
        VeterinarioPopupComponent,
        VeterinarioDeletePopupComponent,
    ],
    entryComponents: [
        VeterinarioComponent,
        VeterinarioDialogComponent,
        VeterinarioPopupComponent,
        VeterinarioDeleteDialogComponent,
        VeterinarioDeletePopupComponent,
    ],
    providers: [
        VeterinarioService,
        VeterinarioPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetVeterinarioModule {}
