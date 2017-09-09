import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EspecieComponent } from './especie.component';
import { EspecieDetailComponent } from './especie-detail.component';
import { EspeciePopupComponent } from './especie-dialog.component';
import { EspecieDeletePopupComponent } from './especie-delete-dialog.component';

export const especieRoute: Routes = [
    {
        path: 'especie',
        component: EspecieComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.especie.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'especie/:id',
        component: EspecieDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.especie.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const especiePopupRoute: Routes = [
    {
        path: 'especie-new',
        component: EspeciePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.especie.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'especie/:id/edit',
        component: EspeciePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.especie.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'especie/:id/delete',
        component: EspecieDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.especie.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
