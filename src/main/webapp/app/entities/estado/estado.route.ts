import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstadoComponent } from './estado.component';
import { EstadoDetailComponent } from './estado-detail.component';
import { EstadoPopupComponent } from './estado-dialog.component';
import { EstadoDeletePopupComponent } from './estado-delete-dialog.component';

export const estadoRoute: Routes = [
    {
        path: 'estado',
        component: EstadoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.estado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estado/:id',
        component: EstadoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.estado.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoPopupRoute: Routes = [
    {
        path: 'estado-new',
        component: EstadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.estado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado/:id/edit',
        component: EstadoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.estado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado/:id/delete',
        component: EstadoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.estado.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
