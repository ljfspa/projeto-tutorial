import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Funcionario } from './funcionario.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class FuncionarioService {

    private resourceUrl = 'api/funcionarios';

    constructor(private http: Http) { }

    create(funcionario: Funcionario): Observable<Funcionario> {
        const copy = this.convert(funcionario);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(funcionario: Funcionario): Observable<Funcionario> {
        const copy = this.convert(funcionario);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Funcionario> {
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

    private convert(funcionario: Funcionario): Funcionario {
        const copy: Funcionario = Object.assign({}, funcionario);
        return copy;
    }
}
