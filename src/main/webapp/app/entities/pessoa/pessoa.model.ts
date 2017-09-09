import { BaseEntity } from './../../shared';

export class Pessoa implements BaseEntity {
    constructor(
        public id?: number,
        public fotoPessoaContentType?: string,
        public fotoPessoa?: any,
        public nome?: string,
        public endereco?: string,
        public rG?: number,
        public cpfPessoa?: string,
        public cep?: string,
        public telefone?: string,
        public dataCadastro?: any,
        public bairro?: BaseEntity,
        public cidade?: BaseEntity,
        public estado?: BaseEntity,
    ) {
    }
}
