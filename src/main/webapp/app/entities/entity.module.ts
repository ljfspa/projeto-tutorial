import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ClinicvetPessoaModule } from './pessoa/pessoa.module';
import { ClinicvetVeterinarioModule } from './veterinario/veterinario.module';
import { ClinicvetClienteModule } from './cliente/cliente.module';
import { ClinicvetFuncionarioModule } from './funcionario/funcionario.module';
import { ClinicvetAnimalModule } from './animal/animal.module';
import { ClinicvetBairroModule } from './bairro/bairro.module';
import { ClinicvetCidadeModule } from './cidade/cidade.module';
import { ClinicvetEstadoModule } from './estado/estado.module';
import { ClinicvetConsultaModule } from './consulta/consulta.module';
import { ClinicvetAgendamentoModule } from './agendamento/agendamento.module';
import { ClinicvetServicoModule } from './servico/servico.module';
import { ClinicvetEspecieModule } from './especie/especie.module';
import { ClinicvetRacaModule } from './raca/raca.module';
import { ClinicvetProdutoModule } from './produto/produto.module';
import { ClinicvetVacinaModule } from './vacina/vacina.module';
import { ClinicvetVermifugoModule } from './vermifugo/vermifugo.module';
import { ClinicvetTratamentoModule } from './tratamento/tratamento.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        ClinicvetPessoaModule,
        ClinicvetVeterinarioModule,
        ClinicvetClienteModule,
        ClinicvetFuncionarioModule,
        ClinicvetAnimalModule,
        ClinicvetBairroModule,
        ClinicvetCidadeModule,
        ClinicvetEstadoModule,
        ClinicvetConsultaModule,
        ClinicvetAgendamentoModule,
        ClinicvetServicoModule,
        ClinicvetEspecieModule,
        ClinicvetRacaModule,
        ClinicvetProdutoModule,
        ClinicvetVacinaModule,
        ClinicvetVermifugoModule,
        ClinicvetTratamentoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ClinicvetEntityModule {}
