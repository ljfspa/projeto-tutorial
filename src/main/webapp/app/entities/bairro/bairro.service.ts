import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Bairro } from './bairro.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BairroService {

    private resourceUrl = 'api/bairros';

    constructor(private http: Http) { }

    create(bairro: Bairro): Observable<Bairro> {
        const copy = this.convert(bairro);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(bairro: Bairro): Observable<Bairro> {
        const copy = this.convert(bairro);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Bairro> {
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

    private convert(bairro: Bairro): Bairro {
        const copy: Bairro = Object.assign({}, bairro);
        return copy;
    }
}
