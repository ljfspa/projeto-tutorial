import { BaseEntity } from './../../shared';

export class Vacina implements BaseEntity {
    constructor(
        public id?: number,
        public vacinaName?: string,
        public aplicVacina?: string,
        public consulta?: BaseEntity,
    ) {
    }
}
