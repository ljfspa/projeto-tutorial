package br.com.clinicvet.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Especie.
 */
@Entity
@Table(name = "especie")
public class Especie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "especie")
    private String especie;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEspecie() {
        return especie;
    }

    public Especie especie(String especie) {
        this.especie = especie;
        return this;
    }

    public void setEspecie(String especie) {
        this.especie = especie;
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
        Especie especie = (Especie) o;
        if (especie.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), especie.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Especie{" +
            "id=" + getId() +
            ", especie='" + getEspecie() + "'" +
            "}";
    }
}
