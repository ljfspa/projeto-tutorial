import { BaseEntity } from './../../shared';

export class Estado implements BaseEntity {
    constructor(
        public id?: number,
        public uF?: string,
        public estadoNome?: string,
        public pessoas?: BaseEntity[],
    ) {
    }
}
