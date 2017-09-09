import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CidadeComponent } from './cidade.component';
import { CidadeDetailComponent } from './cidade-detail.component';
import { CidadePopupComponent } from './cidade-dialog.component';
import { CidadeDeletePopupComponent } from './cidade-delete-dialog.component';

export const cidadeRoute: Routes = [
    {
        path: 'cidade',
        component: CidadeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.cidade.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cidade/:id',
        component: CidadeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.cidade.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cidadePopupRoute: Routes = [
    {
        path: 'cidade-new',
        component: CidadePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.cidade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cidade/:id/edit',
        component: CidadePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.cidade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cidade/:id/delete',
        component: CidadeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.cidade.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
