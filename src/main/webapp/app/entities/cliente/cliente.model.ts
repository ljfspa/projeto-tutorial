import { BaseEntity } from './../../shared';

export class Cliente implements BaseEntity {
    constructor(
        public id?: number,
        public nomeCliente?: string,
        public profisao?: string,
    ) {
    }
}
