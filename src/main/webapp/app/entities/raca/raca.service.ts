import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Raca } from './raca.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RacaService {

    private resourceUrl = 'api/racas';

    constructor(private http: Http) { }

    create(raca: Raca): Observable<Raca> {
        const copy = this.convert(raca);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(raca: Raca): Observable<Raca> {
        const copy = this.convert(raca);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Raca> {
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

    private convert(raca: Raca): Raca {
        const copy: Raca = Object.assign({}, raca);
        return copy;
    }
}
