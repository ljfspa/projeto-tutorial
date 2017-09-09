import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClinicvetSharedModule } from '../../shared';
import {
    VermifugoService,
    VermifugoPopupService,
    VermifugoComponent,
    VermifugoDetailComponent,
    VermifugoDialogComponent,
    VermifugoPopupComponent,
    VermifugoDeletePopupComponent,
    VermifugoDeleteDialogComponent,
    vermifugoRoute,
    vermifugoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...vermifugoRoute,
    ...vermifugoPopupRoute,
];

@NgModule({
    imports: [
        ClinicvetSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        VermifugoComponent,
        VermifugoDetailComponent,
        VermifugoDialogComponent,
        VermifugoDeleteDialogComponent,
        VermifugoPopupComponent,
        VermifugoDeletePopupComponent,
    ],
    entryComponents: [
        VermifugoComponent,
        VermifugoDialogComponent,
        VermifugoPopupComponent,
        VermifugoDeleteDialogComponent,
        VermifugoDeletePopupComponent,
    ],
    providers: [
        VermifugoService,
        VermifugoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetVermifugoModule {}
