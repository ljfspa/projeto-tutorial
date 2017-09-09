import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Especie } from './especie.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class EspecieService {

    private resourceUrl = 'api/especies';

    constructor(private http: Http) { }

    create(especie: Especie): Observable<Especie> {
        const copy = this.convert(especie);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(especie: Especie): Observable<Especie> {
        const copy = this.convert(especie);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Especie> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
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
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(especie: Especie): Especie {
        const copy: Especie = Object.assign({}, especie);
        return copy;
    }
}
