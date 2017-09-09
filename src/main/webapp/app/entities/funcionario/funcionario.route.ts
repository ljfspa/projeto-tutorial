import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FuncionarioComponent } from './funcionario.component';
import { FuncionarioDetailComponent } from './funcionario-detail.component';
import { FuncionarioPopupComponent } from './funcionario-dialog.component';
import { FuncionarioDeletePopupComponent } from './funcionario-delete-dialog.component';

export const funcionarioRoute: Routes = [
    {
        path: 'funcionario',
        component: FuncionarioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'funcionario/:id',
        component: FuncionarioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const funcionarioPopupRoute: Routes = [
    {
        path: 'funcionario-new',
        component: FuncionarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'funcionario/:id/edit',
        component: FuncionarioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'funcionario/:id/delete',
        component: FuncionarioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.funcionario.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
