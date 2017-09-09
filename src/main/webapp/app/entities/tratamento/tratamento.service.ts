import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Tratamento } from './tratamento.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TratamentoService {

    private resourceUrl = 'api/tratamentos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(tratamento: Tratamento): Observable<Tratamento> {
        const copy = this.convert(tratamento);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(tratamento: Tratamento): Observable<Tratamento> {
        const copy = this.convert(tratamento);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Tratamento> {
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
        entity.dataAplicTrat = this.dateUtils
            .convertDateTimeFromServer(entity.dataAplicTrat);
    }

    private convert(tratamento: Tratamento): Tratamento {
        const copy: Tratamento = Object.assign({}, tratamento);

        copy.dataAplicTrat = this.dateUtils.toDate(tratamento.dataAplicTrat);
        return copy;
    }
}
