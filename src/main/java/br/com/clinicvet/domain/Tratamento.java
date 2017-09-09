package br.com.clinicvet.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Tratamento.
 */
@Entity
@Table(name = "tratamento")
public class Tratamento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data_aplic_trat")
    private ZonedDateTime dataAplicTrat;

    @ManyToOne
    private Consulta consulta;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Tratamento nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public Tratamento descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public ZonedDateTime getDataAplicTrat() {
        return dataAplicTrat;
    }

    public Tratamento dataAplicTrat(ZonedDateTime dataAplicTrat) {
        this.dataAplicTrat = dataAplicTrat;
        return this;
    }

    public void setDataAplicTrat(ZonedDateTime dataAplicTrat) {
        this.dataAplicTrat = dataAplicTrat;
    }

    public Consulta getConsulta() {
        return consulta;
    }

    public Tratamento consulta(Consulta consulta) {
        this.consulta = consulta;
        return this;
    }

    public void setConsulta(Consulta consulta) {
        this.consulta = consulta;
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
        Tratamento tratamento = (Tratamento) o;
        if (tratamento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tratamento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tratamento{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", dataAplicTrat='" + getDataAplicTrat() + "'" +
            "}";
    }
}
