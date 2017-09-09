import { BaseEntity } from './../../shared';

export class Agendamento implements BaseEntity {
    constructor(
        public id?: number,
        public dataAgenda?: any,
        public horaAgenda?: string,
        public consultas?: BaseEntity[],
        public servicos?: BaseEntity[],
    ) {
    }
}
