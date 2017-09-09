import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { Animal } from './animal.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AnimalService {

    private resourceUrl = 'api/animals';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(animal: Animal): Observable<Animal> {
        const copy = this.convert(animal);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(animal: Animal): Observable<Animal> {
        const copy = this.convert(animal);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<Animal> {
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
        entity.nascimento = this.dateUtils
            .convertLocalDateFromServer(entity.nascimento);
    }

    private convert(animal: Animal): Animal {
        const copy: Animal = Object.assign({}, animal);
        copy.nascimento = this.dateUtils
            .convertLocalDateToServer(animal.nascimento);
        return copy;
    }
}
