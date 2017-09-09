import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ConsultaComponent } from './consulta.component';
import { ConsultaDetailComponent } from './consulta-detail.component';
import { ConsultaPopupComponent } from './consulta-dialog.component';
import { ConsultaDeletePopupComponent } from './consulta-delete-dialog.component';

export const consultaRoute: Routes = [
    {
        path: 'consulta',
        component: ConsultaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.consulta.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'consulta/:id',
        component: ConsultaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.consulta.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consultaPopupRoute: Routes = [
    {
        path: 'consulta-new',
        component: ConsultaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.consulta.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'consulta/:id/edit',
        component: ConsultaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.consulta.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'consulta/:id/delete',
        component: ConsultaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.consulta.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
