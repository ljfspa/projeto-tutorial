package br.com.clinicvet.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import br.com.clinicvet.domain.enumeration.Funcao;

/**
 * A Funcionario.
 */
@Entity
@Table(name = "funcionario")
public class Funcionario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "matricula")
    private Integer matricula;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private Funcao tipo;

    @OneToOne
    @JoinColumn(unique = true)
    private Pessoa pessoa;

    @ManyToOne
    private Funcionario manager;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMatricula() {
        return matricula;
    }

    public Funcionario matricula(Integer matricula) {
        this.matricula = matricula;
        return this;
    }

    public void setMatricula(Integer matricula) {
        this.matricula = matricula;
    }

    public Funcao getTipo() {
        return tipo;
    }

    public Funcionario tipo(Funcao tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(Funcao tipo) {
        this.tipo = tipo;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public Funcionario pessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
        return this;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public Funcionario getManager() {
        return manager;
    }

    public Funcionario manager(Funcionario funcionario) {
        this.manager = funcionario;
        return this;
    }

    public void setManager(Funcionario funcionario) {
        this.manager = funcionario;
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
        Funcionario funcionario = (Funcionario) o;
        if (funcionario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), funcionario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Funcionario{" +
            "id=" + getId() +
            ", matricula='" + getMatricula() + "'" +
            ", tipo='" + getTipo() + "'" +
            "}";
    }
}
