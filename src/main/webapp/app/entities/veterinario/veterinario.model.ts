import { BaseEntity } from './../../shared';

export class Veterinario implements BaseEntity {
    constructor(
        public id?: number,
        public nomeVeterinario?: string,
        public cRMV?: string,
        public especialidade?: string,
        public pessoa?: BaseEntity,
    ) {
    }
}
