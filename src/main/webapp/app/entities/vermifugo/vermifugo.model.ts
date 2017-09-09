import { BaseEntity } from './../../shared';

export class Vermifugo implements BaseEntity {
    constructor(
        public id?: number,
        public vermifugoName?: string,
        public aplicVermifugo?: string,
        public consulta?: BaseEntity,
    ) {
    }
}
