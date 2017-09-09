import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { BairroComponent } from './bairro.component';
import { BairroDetailComponent } from './bairro-detail.component';
import { BairroPopupComponent } from './bairro-dialog.component';
import { BairroDeletePopupComponent } from './bairro-delete-dialog.component';

export const bairroRoute: Routes = [
    {
        path: 'bairro',
        component: BairroComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.bairro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bairro/:id',
        component: BairroDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.bairro.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bairroPopupRoute: Routes = [
    {
        path: 'bairro-new',
        component: BairroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.bairro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bairro/:id/edit',
        component: BairroPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.bairro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bairro/:id/delete',
        component: BairroDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.bairro.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
