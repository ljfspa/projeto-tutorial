package br.com.clinicvet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Agendamento.
 */
@Entity
@Table(name = "agendamento")
public class Agendamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_agenda")
    private LocalDate dataAgenda;

    @Column(name = "hora_agenda")
    private String horaAgenda;

    @OneToMany(mappedBy = "agendamento")
    @JsonIgnore
    private Set<Consulta> consultas = new HashSet<>();

    @OneToMany(mappedBy = "agendamento")
    @JsonIgnore
    private Set<Servico> servicos = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataAgenda() {
        return dataAgenda;
    }

    public Agendamento dataAgenda(LocalDate dataAgenda) {
        this.dataAgenda = dataAgenda;
        return this;
    }

    public void setDataAgenda(LocalDate dataAgenda) {
        this.dataAgenda = dataAgenda;
    }

    public String getHoraAgenda() {
        return horaAgenda;
    }

    public Agendamento horaAgenda(String horaAgenda) {
        this.horaAgenda = horaAgenda;
        return this;
    }

    public void setHoraAgenda(String horaAgenda) {
        this.horaAgenda = horaAgenda;
    }

    public Set<Consulta> getConsultas() {
        return consultas;
    }

    public Agendamento consultas(Set<Consulta> consultas) {
        this.consultas = consultas;
        return this;
    }

    public Agendamento addConsulta(Consulta consulta) {
        this.consultas.add(consulta);
        consulta.setAgendamento(this);
        return this;
    }

    public Agendamento removeConsulta(Consulta consulta) {
        this.consultas.remove(consulta);
        consulta.setAgendamento(null);
        return this;
    }

    public void setConsultas(Set<Consulta> consultas) {
        this.consultas = consultas;
    }

    public Set<Servico> getServicos() {
        return servicos;
    }

    public Agendamento servicos(Set<Servico> servicos) {
        this.servicos = servicos;
        return this;
    }

    public Agendamento addServico(Servico servico) {
        this.servicos.add(servico);
        servico.setAgendamento(this);
        return this;
    }

    public Agendamento removeServico(Servico servico) {
        this.servicos.remove(servico);
        servico.setAgendamento(null);
        return this;
    }

    public void setServicos(Set<Servico> servicos) {
        this.servicos = servicos;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Agendamento agendamento = (Agendamento) o;
        if (agendamento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), agendamento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Agendamento{" +
            "id=" + getId() +
            ", dataAgenda='" + getDataAgenda() + "'" +
            ", horaAgenda='" + getHoraAgenda() + "'" +
            "}";
    }
}
