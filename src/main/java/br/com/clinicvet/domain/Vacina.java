package br.com.clinicvet.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Vacina.
 */
@Entity
@Table(name = "vacina")
public class Vacina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vacina_name")
    private String vacinaName;

    @Column(name = "aplic_vacina")
    private String aplicVacina;

    @ManyToOne
    private Consulta consulta;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVacinaName() {
        return vacinaName;
    }

    public Vacina vacinaName(String vacinaName) {
        this.vacinaName = vacinaName;
        return this;
    }

    public void setVacinaName(String vacinaName) {
        this.vacinaName = vacinaName;
    }

    public String getAplicVacina() {
        return aplicVacina;
    }

    public Vacina aplicVacina(String aplicVacina) {
        this.aplicVacina = aplicVacina;
        return this;
    }

    public void setAplicVacina(String aplicVacina) {
        this.aplicVacina = aplicVacina;
    }

    public Consulta getConsulta() {
        return consulta;
    }

    public Vacina consulta(Consulta consulta) {
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
        Vacina vacina = (Vacina) o;
        if (vacina.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vacina.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vacina{" +
            "id=" + getId() +
            ", vacinaName='" + getVacinaName() + "'" +
            ", aplicVacina='" + getAplicVacina() + "'" +
            "}";
    }
}
