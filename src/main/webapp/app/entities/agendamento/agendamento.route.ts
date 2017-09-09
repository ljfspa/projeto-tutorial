import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AgendamentoComponent } from './agendamento.component';
import { AgendamentoDetailComponent } from './agendamento-detail.component';
import { AgendamentoPopupComponent } from './agendamento-dialog.component';
import { AgendamentoDeletePopupComponent } from './agendamento-delete-dialog.component';

export const agendamentoRoute: Routes = [
    {
        path: 'agendamento',
        component: AgendamentoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.agendamento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'agendamento/:id',
        component: AgendamentoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.agendamento.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const agendamentoPopupRoute: Routes = [
    {
        path: 'agendamento-new',
        component: AgendamentoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.agendamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agendamento/:id/edit',
        component: AgendamentoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.agendamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'agendamento/:id/delete',
        component: AgendamentoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.agendamento.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
