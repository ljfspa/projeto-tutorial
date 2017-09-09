import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Vacina } from './vacina.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class VacinaService {

    private resourceUrl = 'api/vacinas';

    constructor(private http: Http) { }

    create(vacina: Vacina): Observable<Vacina> {
        const copy = this.convert(vacina);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(vacina: Vacina): Observable<Vacina> {
        const copy = this.convert(vacina);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Vacina> {
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

    private convert(vacina: Vacina): Vacina {
        const copy: Vacina = Object.assign({}, vacina);
        return copy;
    }
}
