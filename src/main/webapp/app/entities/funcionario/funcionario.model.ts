import { BaseEntity } from './../../shared';

const enum Funcao {
    'GERENTE',
    'ADMINISTRADOR',
    'ATENDENTE',
    'TOSADOR'
}

export class Funcionario implements BaseEntity {
    constructor(
        public id?: number,
        public matricula?: number,
        public tipo?: Funcao,
        public pessoa?: BaseEntity,
        public manager?: BaseEntity,
    ) {
    }
}
