import { BaseEntity } from './../../shared';

export class Raca implements BaseEntity {
    constructor(
        public id?: number,
        public raca?: string,
    ) {
    }
}
