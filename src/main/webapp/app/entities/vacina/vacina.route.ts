import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { VacinaComponent } from './vacina.component';
import { VacinaDetailComponent } from './vacina-detail.component';
import { VacinaPopupComponent } from './vacina-dialog.component';
import { VacinaDeletePopupComponent } from './vacina-delete-dialog.component';

export const vacinaRoute: Routes = [
    {
        path: 'vacina',
        component: VacinaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.vacina.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vacina/:id',
        component: VacinaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.vacina.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vacinaPopupRoute: Routes = [
    {
        path: 'vacina-new',
        component: VacinaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.vacina.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vacina/:id/edit',
        component: VacinaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.vacina.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vacina/:id/delete',
        component: VacinaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'clinicvetApp.vacina.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
