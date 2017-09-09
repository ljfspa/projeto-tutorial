import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { VeterinarioComponent } from './veterinario.component';
import { VeterinarioDetailComponent } from './veterinario-detail.component';
import { VeterinarioPopupComponent } from './veterinario-dialog.component';
import { VeterinarioDeletePopupComponent } from './veterinario-delete-dialog.component';

export const veterinarioRoute: Routes = [
    {
        path: 'veterinario',
        component: VeterinarioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.veterinario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'veterinario/:id',
        component: VeterinarioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.veterinario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const veterinarioPopupRoute: Routes = [
    {
        path: 'veterinario-new',
        component: VeterinarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.veterinario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'veterinario/:id/edit',
        component: VeterinarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.veterinario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'veterinario/:id/delete',
        component: VeterinarioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.veterinario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
