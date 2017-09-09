import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ServicoComponent } from './servico.component';
import { ServicoDetailComponent } from './servico-detail.component';
import { ServicoPopupComponent } from './servico-dialog.component';
import { ServicoDeletePopupComponent } from './servico-delete-dialog.component';

export const servicoRoute: Routes = [
    {
        path: 'servico',
        component: ServicoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.servico.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'servico/:id',
        component: ServicoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.servico.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const servicoPopupRoute: Routes = [
    {
        path: 'servico-new',
        component: ServicoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.servico.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'servico/:id/edit',
        component: ServicoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.servico.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'servico/:id/delete',
        component: ServicoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.servico.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
