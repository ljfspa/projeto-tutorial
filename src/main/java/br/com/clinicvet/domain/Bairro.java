package br.com.clinicvet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Bairro.
 */
@Entity
@Table(name = "bairro")
public class Bairro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bairro")
    private String bairro;

    @OneToMany(mappedBy = "bairro")
    @JsonIgnore
    private Set<Pessoa> pessoas = new HashSet<>();

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBairro() {
        return bairro;
    }

    public Bairro bairro(String bairro) {
        this.bairro = bairro;
        return this;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public Set<Pessoa> getPessoas() {
        return pessoas;
    }

    public Bairro pessoas(Set<Pessoa> pessoas) {
        this.pessoas = pessoas;
        return this;
    }

    public Bairro addPessoa(Pessoa pessoa) {
        this.pessoas.add(pessoa);
        pessoa.setBairro(this);
        return this;
    }

    public Bairro removePessoa(Pessoa pessoa) {
        this.pessoas.remove(pessoa);
        pessoa.setBairro(null);
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
        Bairro bairro = (Bairro) o;
        if (bairro.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bairro.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bairro{" +
            "id=" + getId() +
            ", bairro='" + getBairro() + "'" +
            "}";
    }
}
