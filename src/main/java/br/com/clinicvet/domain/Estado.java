package br.com.clinicvet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Estado.
 */
@Entity
@Table(name = "estado")
public class Estado implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "u_f")
    private String uF;

    @Column(name = "estado_nome")
    private String estadoNome;

    @OneToMany(mappedBy = "estado")
    @JsonIgnore
    private Set<Pessoa> pessoas = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getuF() {
        return uF;
    }

    public Estado uF(String uF) {
        this.uF = uF;
        return this;
    }

    public void setuF(String uF) {
        this.uF = uF;
    }

    public String getEstadoNome() {
        return estadoNome;
    }

    public Estado estadoNome(String estadoNome) {
        this.estadoNome = estadoNome;
        return this;
    }

    public void setEstadoNome(String estadoNome) {
        this.estadoNome = estadoNome;
    }

    public Set<Pessoa> getPessoas() {
        return pessoas;
    }

    public Estado pessoas(Set<Pessoa> pessoas) {
        this.pessoas = pessoas;
        return this;
    }

    public Estado addPessoa(Pessoa pessoa) {
        this.pessoas.add(pessoa);
        pessoa.setEstado(this);
        return this;
    }

    public Estado removePessoa(Pessoa pessoa) {
        this.pessoas.remove(pessoa);
        pessoa.setEstado(null);
        return this;
    }

    public void setPessoas(Set<Pessoa> pessoas) {
        this.pessoas = pessoas;
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
        Estado estado = (Estado) o;
        if (estado.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), estado.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Estado{" +
            "id=" + getId() +
            ", uF='" + getuF() + "'" +
            ", estadoNome='" + getEstadoNome() + "'" +
            "}";
    }
}
