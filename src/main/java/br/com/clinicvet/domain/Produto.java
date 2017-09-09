package br.com.clinicvet.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Produto.
 */
@Entity
@Table(name = "produto")
public class Produto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "unidade")
    private Integer unidade;

    @Column(name = "qt_estoque")
    private Long qtEstoque;

    @Column(name = "validade")
    private LocalDate validade;

    @Column(name = "preco_compra")
    private Long precoCompra;

    @Column(name = "preco_venda")
    private Long precoVenda;

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

    public Produto nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getUnidade() {
        return unidade;
    }

    public Produto unidade(Integer unidade) {
        this.unidade = unidade;
        return this;
    }

    public void setUnidade(Integer unidade) {
        this.unidade = unidade;
    }

    public Long getQtEstoque() {
        return qtEstoque;
    }

    public Produto qtEstoque(Long qtEstoque) {
        this.qtEstoque = qtEstoque;
        return this;
    }

    public void setQtEstoque(Long qtEstoque) {
        this.qtEstoque = qtEstoque;
    }

    public LocalDate getValidade() {
        return validade;
    }

    public Produto validade(LocalDate validade) {
        this.validade = validade;
        return this;
    }

    public void setValidade(LocalDate validade) {
        this.validade = validade;
    }

    public Long getPrecoCompra() {
        return precoCompra;
    }

    public Produto precoCompra(Long precoCompra) {
        this.precoCompra = precoCompra;
        return this;
    }

    public void setPrecoCompra(Long precoCompra) {
        this.precoCompra = precoCompra;
    }

    public Long getPrecoVenda() {
        return precoVenda;
    }

    public Produto precoVenda(Long precoVenda) {
        this.precoVenda = precoVenda;
        return this;
    }

    public void setPrecoVenda(Long precoVenda) {
        this.precoVenda = precoVenda;
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
        Produto produto = (Produto) o;
        if (produto.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), produto.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Produto{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", unidade='" + getUnidade() + "'" +
            ", qtEstoque='" + getQtEstoque() + "'" +
            ", validade='" + getValidade() + "'" +
            ", precoCompra='" + getPrecoCompra() + "'" +
            ", precoVenda='" + getPrecoVenda() + "'" +
            "}";
    }
}
