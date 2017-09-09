package br.com.clinicvet.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Pessoa.
 */
@Entity
@Table(name = "pessoa")
public class Pessoa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "foto_pessoa")
    private byte[] fotoPessoa;

    @Column(name = "foto_pessoa_content_type")
    private String fotoPessoaContentType;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "endereco", nullable = false)
    private String endereco;

    @Column(name = "r_g")
    private Integer rG;

    @Column(name = "cpf_pessoa")
    private String cpfPessoa;

    @Column(name = "cep")
    private String cep;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "data_cadastro")
    private ZonedDateTime dataCadastro;

    @ManyToOne
    private Bairro bairro;

    @ManyToOne
    private Cidade cidade;

    @ManyToOne
    private Estado estado;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getFotoPessoa() {
        return fotoPessoa;
    }

    public Pessoa fotoPessoa(byte[] fotoPessoa) {
        this.fotoPessoa = fotoPessoa;
        return this;
    }

    public void setFotoPessoa(byte[] fotoPessoa) {
        this.fotoPessoa = fotoPessoa;
    }

    public String getFotoPessoaContentType() {
        return fotoPessoaContentType;
    }

    public Pessoa fotoPessoaContentType(String fotoPessoaContentType) {
        this.fotoPessoaContentType = fotoPessoaContentType;
        return this;
    }

    public void setFotoPessoaContentType(String fotoPessoaContentType) {
        this.fotoPessoaContentType = fotoPessoaContentType;
    }

    public String getNome() {
        return nome;
    }

    public Pessoa nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public Pessoa endereco(String endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public Integer getrG() {
        return rG;
    }

    public Pessoa rG(Integer rG) {
        this.rG = rG;
        return this;
    }

    public void setrG(Integer rG) {
        this.rG = rG;
    }

    public String getCpfPessoa() {
        return cpfPessoa;
    }

    public Pessoa cpfPessoa(String cpfPessoa) {
        this.cpfPessoa = cpfPessoa;
        return this;
    }

    public void setCpfPessoa(String cpfPessoa) {
        this.cpfPessoa = cpfPessoa;
    }

    public String getCep() {
        return cep;
    }

    public Pessoa cep(String cep) {
        this.cep = cep;
        return this;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getTelefone() {
        return telefone;
    }

    public Pessoa telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public ZonedDateTime getDataCadastro() {
        return dataCadastro;
    }

    public Pessoa dataCadastro(ZonedDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
        return this;
    }

    public void setDataCadastro(ZonedDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public Bairro getBairro() {
        return bairro;
    }

    public Pessoa bairro(Bairro bairro) {
        this.bairro = bairro;
        return this;
    }

    public void setBairro(Bairro bairro) {
        this.bairro = bairro;
    }

    public Cidade getCidade() {
        return cidade;
    }

    public Pessoa cidade(Cidade cidade) {
        this.cidade = cidade;
        return this;
    }

    public void setCidade(Cidade cidade) {
        this.cidade = cidade;
    }

    public Estado getEstado() {
        return estado;
    }

    public Pessoa estado(Estado estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Estado estado) {
        this.estado = estado;
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
        Pessoa pessoa = (Pessoa) o;
        if (pessoa.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), pessoa.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Pessoa{" +
            "id=" + getId() +
            ", fotoPessoa='" + getFotoPessoa() + "'" +
            ", fotoPessoaContentType='" + fotoPessoaContentType + "'" +
            ", nome='" + getNome() + "'" +
            ", endereco='" + getEndereco() + "'" +
            ", rG='" + getrG() + "'" +
            ", cpfPessoa='" + getCpfPessoa() + "'" +
            ", cep='" + getCep() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", dataCadastro='" + getDataCadastro() + "'" +
            "}";
    }
}
