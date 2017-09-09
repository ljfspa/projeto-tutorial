package br.com.clinicvet.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Servico.
 */
@Entity
@Table(name = "servico")
public class Servico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "servico")
    private String servico;

    @ManyToOne
    private Agendamento agendamento;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getServico() {
        return servico;
    }

    public Servico servico(String servico) {
        this.servico = servico;
        return this;
    }

    public void setServico(String servico) {
        this.servico = servico;
    }

    public Agendamento getAgendamento() {
        return agendamento;
    }

    public Servico agendamento(Agendamento agendamento) {
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
        Servico servico = (Servico) o;
        if (servico.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), servico.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Servico{" +
            "id=" + getId() +
            ", servico='" + getServico() + "'" +
            "}";
    }
}
