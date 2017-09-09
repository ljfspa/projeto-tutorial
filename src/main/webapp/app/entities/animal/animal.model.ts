import { BaseEntity } from './../../shared';

const enum TpPorte {
    'PEQUENO',
    'MEDIO',
    'GRANDE'
}

export class Animal implements BaseEntity {
    constructor(
        public id?: number,
        public fotoAnimalContentType?: string,
        public fotoAnimal?: any,
        public nomeAnimal?: string,
        public sexo?: string,
        public pelagem?: string,
        public obsTosa?: string,
        public nascimento?: any,
        public porte?: TpPorte,
        public raca?: BaseEntity,
        public especie?: BaseEntity,
    ) {
    }
}
