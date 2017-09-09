import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { VermifugoComponent } from './vermifugo.component';
import { VermifugoDetailComponent } from './vermifugo-detail.component';
import { VermifugoPopupComponent } from './vermifugo-dialog.component';
import { VermifugoDeletePopupComponent } from './vermifugo-delete-dialog.component';

export const vermifugoRoute: Routes = [
    {
        path: 'vermifugo',
        component: VermifugoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.vermifugo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vermifugo/:id',
        component: VermifugoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.vermifugo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vermifugoPopupRoute: Routes = [
    {
        path: 'vermifugo-new',
        component: VermifugoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.vermifugo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vermifugo/:id/edit',
        component: VermifugoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.vermifugo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vermifugo/:id/delete',
        component: VermifugoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.vermifugo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
