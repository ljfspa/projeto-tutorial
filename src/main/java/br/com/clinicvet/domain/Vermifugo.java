package br.com.clinicvet.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Vermifugo.
 */
@Entity
@Table(name = "vermifugo")
public class Vermifugo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vermifugo_name")
    private String vermifugoName;

    @Column(name = "aplic_vermifugo")
    private String aplicVermifugo;

    @ManyToOne
    private Consulta consulta;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVermifugoName() {
        return vermifugoName;
    }

    public Vermifugo vermifugoName(String vermifugoName) {
        this.vermifugoName = vermifugoName;
        return this;
    }

    public void setVermifugoName(String vermifugoName) {
        this.vermifugoName = vermifugoName;
    }

    public String getAplicVermifugo() {
        return aplicVermifugo;
    }

    public Vermifugo aplicVermifugo(String aplicVermifugo) {
        this.aplicVermifugo = aplicVermifugo;
        return this;
    }

    public void setAplicVermifugo(String aplicVermifugo) {
        this.aplicVermifugo = aplicVermifugo;
    }

    public Consulta getConsulta() {
        return consulta;
    }

    public Vermifugo consulta(Consulta consulta) {
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
        Vermifugo vermifugo = (Vermifugo) o;
        if (vermifugo.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vermifugo.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vermifugo{" +
            "id=" + getId() +
            ", vermifugoName='" + getVermifugoName() + "'" +
            ", aplicVermifugo='" + getAplicVermifugo() + "'" +
            "}";
    }
}
