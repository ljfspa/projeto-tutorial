import { BaseEntity } from './../../shared';

export class Produto implements BaseEntity {
    constructor(
        public id?: number,
        public nome?: string,
        public unidade?: number,
        public qtEstoque?: number,
        public validade?: any,
        public precoCompra?: number,
        public precoVenda?: number,
    ) {
    }
}
