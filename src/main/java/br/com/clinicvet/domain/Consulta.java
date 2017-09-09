package br.com.clinicvet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Consulta.
 */
@Entity
@Table(name = "consulta")
public class Consulta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_consulta")
    private LocalDate dataConsulta;

    @Column(name = "hora_consulta")
    private String horaConsulta;

    @Column(name = "motivo_consulta")
    private String motivoConsulta;

    @Column(name = "desc_consulta")
    private String descConsulta;

    @Column(name = "recetuario")
    private String recetuario;

    @Column(name = "pesagem")
    private Long pesagem;

    @OneToMany(mappedBy = "consulta")
    @JsonIgnore
    private Set<Vacina> vacinas = new HashSet<>();

    @OneToMany(mappedBy = "consulta")
    @JsonIgnore
    private Set<Vermifugo> vermifugos = new HashSet<>();

    @OneToMany(mappedBy = "consulta")
    @JsonIgnore
    private Set<Tratamento> tratamentos = new HashSet<>();

    @ManyToOne
    private Agendamento agendamento;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDataConsulta() {
        return dataConsulta;
    }

    public Consulta dataConsulta(LocalDate dataConsulta) {
        this.dataConsulta = dataConsulta;
        return this;
    }

    public void setDataConsulta(LocalDate dataConsulta) {
        this.dataConsulta = dataConsulta;
    }

    public String getHoraConsulta() {
        return horaConsulta;
    }

    public Consulta horaConsulta(String horaConsulta) {
        this.horaConsulta = horaConsulta;
        return this;
    }

    public void setHoraConsulta(String horaConsulta) {
        this.horaConsulta = horaConsulta;
    }

    public String getMotivoConsulta() {
        return motivoConsulta;
    }

    public Consulta motivoConsulta(String motivoConsulta) {
        this.motivoConsulta = motivoConsulta;
        return this;
    }

    public void setMotivoConsulta(String motivoConsulta) {
        this.motivoConsulta = motivoConsulta;
    }

    public String getDescConsulta() {
        return descConsulta;
    }

    public Consulta descConsulta(String descConsulta) {
        this.descConsulta = descConsulta;
        return this;
    }

    public void setDescConsulta(String descConsulta) {
        this.descConsulta = descConsulta;
    }

    public String getRecetuario() {
        return recetuario;
    }

    public Consulta recetuario(String recetuario) {
        this.recetuario = recetuario;
        return this;
    }

    public void setRecetuario(String recetuario) {
        this.recetuario = recetuario;
    }

    public Long getPesagem() {
        return pesagem;
    }

    public Consulta pesagem(Long pesagem) {
        this.pesagem = pesagem;
        return this;
    }

    public void setPesagem(Long pesagem) {
        this.pesagem = pesagem;
    }

    public Set<Vacina> getVacinas() {
        return vacinas;
    }

    public Consulta vacinas(Set<Vacina> vacinas) {
        this.vacinas = vacinas;
        return this;
    }

    public Consulta addVacina(Vacina vacina) {
        this.vacinas.add(vacina);
        vacina.setConsulta(this);
        return this;
    }

    public Consulta removeVacina(Vacina vacina) {
        this.vacinas.remove(vacina);
        vacina.setConsulta(null);
        return this;
    }

    public void setVacinas(Set<Vacina> vacinas) {
        this.vacinas = vacinas;
    }

    public Set<Vermifugo> getVermifugos() {
        return vermifugos;
    }

    public Consulta vermifugos(Set<Vermifugo> vermifugos) {
        this.vermifugos = vermifugos;
        return this;
    }

    public Consulta addVermifugo(Vermifugo vermifugo) {
        this.vermifugos.add(vermifugo);
        vermifugo.setConsulta(this);
        return this;
    }

    public Consulta removeVermifugo(Vermifugo vermifugo) {
        this.vermifugos.remove(vermifugo);
        vermifugo.setConsulta(null);
        return this;
    }

    public void setVermifugos(Set<Vermifugo> vermifugos) {
        this.vermifugos = vermifugos;
    }

    public Set<Tratamento> getTratamentos() {
        return tratamentos;
    }

    public Consulta tratamentos(Set<Tratamento> tratamentos) {
        this.tratamentos = tratamentos;
        return this;
    }

    public Consulta addTratamento(Tratamento tratamento) {
        this.tratamentos.add(tratamento);
        tratamento.setConsulta(this);
        return this;
    }

    public Consulta removeTratamento(Tratamento tratamento) {
        this.tratamentos.remove(tratamento);
        tratamento.setConsulta(null);
        return this;
    }

    public void setTratamentos(Set<Tratamento> tratamentos) {
        this.tratamentos = tratamentos;
    }

    public Agendamento getAgendamento() {
        return agendamento;
    }

    public Consulta agendamento(Agendamento agendamento) {
        this.agendamento = agendamento;
        return this;
    }

    public void setAgendamento(Agendamento agendamento) {
        this.agendamento = agendamento;
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
        Consulta consulta = (Consulta) o;
        if (consulta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), consulta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Consulta{" +
            "id=" + getId() +
            ", dataConsulta='" + getDataConsulta() + "'" +
            ", horaConsulta='" + getHoraConsulta() + "'" +
            ", motivoConsulta='" + getMotivoConsulta() + "'" +
            ", descConsulta='" + getDescConsulta() + "'" +
            ", recetuario='" + getRecetuario() + "'" +
            ", pesagem='" + getPesagem() + "'" +
            "}";
    }
}
