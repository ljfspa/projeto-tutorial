import { BaseEntity } from './../../shared';

export class Especie implements BaseEntity {
    constructor(
        public id?: number,
        public especie?: string,
    ) {
    }
}
