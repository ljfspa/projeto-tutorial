import { BaseEntity } from './../../shared';

export class Cidade implements BaseEntity {
    constructor(
        public id?: number,
        public cidade?: string,
        public pessoas?: BaseEntity[],
    ) {
    }
}
