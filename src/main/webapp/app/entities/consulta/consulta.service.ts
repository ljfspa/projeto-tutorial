import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Consulta } from './consulta.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ConsultaService {

    private resourceUrl = 'api/consultas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(consulta: Consulta): Observable<Consulta> {
        const copy = this.convert(consulta);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(consulta: Consulta): Observable<Consulta> {
        const copy = this.convert(consulta);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Consulta> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.dataConsulta = this.dateUtils
            .convertLocalDateFromServer(entity.dataConsulta);
    }

    private convert(consulta: Consulta): Consulta {
        const copy: Consulta = Object.assign({}, consulta);
        copy.dataConsulta = this.dateUtils
            .convertLocalDateToServer(consulta.dataConsulta);
        return copy;
    }
}
