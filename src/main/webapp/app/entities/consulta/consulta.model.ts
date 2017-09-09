import { BaseEntity } from './../../shared';

export class Consulta implements BaseEntity {
    constructor(
        public id?: number,
        public dataConsulta?: any,
        public horaConsulta?: string,
        public motivoConsulta?: string,
        public descConsulta?: string,
        public recetuario?: string,
        public pesagem?: number,
        public vacinas?: BaseEntity[],
        public vermifugos?: BaseEntity[],
        public tratamentos?: BaseEntity[],
        public agendamento?: BaseEntity,
    ) {
    }
}
