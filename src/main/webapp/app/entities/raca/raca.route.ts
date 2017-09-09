import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RacaComponent } from './raca.component';
import { RacaDetailComponent } from './raca-detail.component';
import { RacaPopupComponent } from './raca-dialog.component';
import { RacaDeletePopupComponent } from './raca-delete-dialog.component';

export const racaRoute: Routes = [
    {
        path: 'raca',
        component: RacaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.raca.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'raca/:id',
        component: RacaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.raca.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const racaPopupRoute: Routes = [
    {
        path: 'raca-new',
        component: RacaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.raca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'raca/:id/edit',
        component: RacaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.raca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'raca/:id/delete',
        component: RacaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.raca.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
