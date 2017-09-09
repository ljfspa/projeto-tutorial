import { BaseEntity } from './../../shared';

export class Bairro implements BaseEntity {
    constructor(
        public id?: number,
        public bairro?: string,
        public pessoas?: BaseEntity[],
    ) {
    }
}
