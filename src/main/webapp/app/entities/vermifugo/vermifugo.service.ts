import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Vermifugo } from './vermifugo.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class VermifugoService {

    private resourceUrl = 'api/vermifugos';

    constructor(private http: Http) { }

    create(vermifugo: Vermifugo): Observable<Vermifugo> {
        const copy = this.convert(vermifugo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(vermifugo: Vermifugo): Observable<Vermifugo> {
        const copy = this.convert(vermifugo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Vermifugo> {
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

    private convert(vermifugo: Vermifugo): Vermifugo {
        const copy: Vermifugo = Object.assign({}, vermifugo);
        return copy;
    }
}
