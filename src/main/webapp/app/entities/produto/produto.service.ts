import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Produto } from './produto.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProdutoService {

    private resourceUrl = 'api/produtos';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(produto: Produto): Observable<Produto> {
        const copy = this.convert(produto);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(produto: Produto): Observable<Produto> {
        const copy = this.convert(produto);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Produto> {
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
        entity.validade = this.dateUtils
            .convertLocalDateFromServer(entity.validade);
    }

    private convert(produto: Produto): Produto {
        const copy: Produto = Object.assign({}, produto);
        copy.validade = this.dateUtils
            .convertLocalDateToServer(produto.validade);
        return copy;
    }
}
