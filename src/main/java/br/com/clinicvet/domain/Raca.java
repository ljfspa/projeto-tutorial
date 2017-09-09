package br.com.clinicvet.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Raca.
 */
@Entity
@Table(name = "raca")
public class Raca implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "raca")
    private String raca;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRaca() {
        return raca;
    }

    public Raca raca(String raca) {
        this.raca = raca;
        return this;
    }

    public void setRaca(String raca) {
        this.raca = raca;
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
        Raca raca = (Raca) o;
        if (raca.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), raca.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Raca{" +
            "id=" + getId() +
            ", raca='" + getRaca() + "'" +
            "}";
    }
}
