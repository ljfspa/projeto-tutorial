package br.com.clinicvet.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Veterinario.
 */
@Entity
@Table(name = "veterinario")
public class Veterinario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_veterinario")
    private String nomeVeterinario;

    @Column(name = "c_rmv")
    private String cRMV;

    @Column(name = "especialidade")
    private String especialidade;

    @OneToOne
    @JoinColumn(unique = true)
    private Pessoa pessoa;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeVeterinario() {
        return nomeVeterinario;
    }

    public Veterinario nomeVeterinario(String nomeVeterinario) {
        this.nomeVeterinario = nomeVeterinario;
        return this;
    }

    public void setNomeVeterinario(String nomeVeterinario) {
        this.nomeVeterinario = nomeVeterinario;
    }

    public String getcRMV() {
        return cRMV;
    }

    public Veterinario cRMV(String cRMV) {
        this.cRMV = cRMV;
        return this;
    }

    public void setcRMV(String cRMV) {
        this.cRMV = cRMV;
    }

    public String getEspecialidade() {
        return especialidade;
    }

    public Veterinario especialidade(String especialidade) {
        this.especialidade = especialidade;
        return this;
    }

    public void setEspecialidade(String especialidade) {
        this.especialidade = especialidade;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public Veterinario pessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
        return this;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
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
        Veterinario veterinario = (Veterinario) o;
        if (veterinario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), veterinario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Veterinario{" +
            "id=" + getId() +
            ", nomeVeterinario='" + getNomeVeterinario() + "'" +
            ", cRMV='" + getcRMV() + "'" +
            ", especialidade='" + getEspecialidade() + "'" +
            "}";
    }
}
