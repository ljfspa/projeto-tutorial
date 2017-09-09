import { BaseEntity } from './../../shared';

export class Tratamento implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public dataAplicTrat?: any,
        public consulta?: BaseEntity,
    ) {
    }
}
