import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Consulta } from './consulta.model';
import { ConsultaService } from './consulta.service';

@Injectable()
export class ConsultaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private consultaService: ConsultaService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.consultaService.find(id).subscribe((consulta) => {
                    if (consulta.dataConsulta) {
                        consulta.dataConsulta = {
                            year: consulta.dataConsulta.getFullYear(),
                            month: consulta.dataConsulta.getMonth() + 1,
                            day: consulta.dataConsulta.getDate()
                        };
                    }
                    this.ngbModalRef = this.consultaModalRef(component, consulta);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.consultaModalRef(component, new Consulta());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    consultaModalRef(component: Component, consulta: Consulta): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.consulta = consulta;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
