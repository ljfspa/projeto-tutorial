import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TratamentoComponent } from './tratamento.component';
import { TratamentoDetailComponent } from './tratamento-detail.component';
import { TratamentoPopupComponent } from './tratamento-dialog.component';
import { TratamentoDeletePopupComponent } from './tratamento-delete-dialog.component';

export const tratamentoRoute: Routes = [
    {
        path: 'tratamento',
        component: TratamentoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.tratamento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tratamento/:id',
        component: TratamentoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.tratamento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tratamentoPopupRoute: Routes = [
    {
        path: 'tratamento-new',
        component: TratamentoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.tratamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tratamento/:id/edit',
        component: TratamentoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.tratamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tratamento/:id/delete',
        component: TratamentoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.tratamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
