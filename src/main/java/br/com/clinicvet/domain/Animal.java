package br.com.clinicvet.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import br.com.clinicvet.domain.enumeration.TpPorte;

/**
 * A Animal.
 */
@Entity
@Table(name = "animal")
public class Animal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "foto_animal")
    private byte[] fotoAnimal;

    @Column(name = "foto_animal_content_type")
    private String fotoAnimalContentType;

    @Column(name = "nome_animal")
    private String nomeAnimal;

    @Column(name = "sexo")
    private String sexo;

    @Column(name = "pelagem")
    private String pelagem;

    @Column(name = "obs_tosa")
    private String obsTosa;

    @Column(name = "nascimento")
    private LocalDate nascimento;

    @Enumerated(EnumType.STRING)
    @Column(name = "porte")
    private TpPorte porte;

    @OneToOne
    @JoinColumn(unique = true)
    private Raca raca;

    @OneToOne
    @JoinColumn(unique = true)
    private Especie especie;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getFotoAnimal() {
        return fotoAnimal;
    }

    public Animal fotoAnimal(byte[] fotoAnimal) {
        this.fotoAnimal = fotoAnimal;
        return this;
    }

    public void setFotoAnimal(byte[] fotoAnimal) {
        this.fotoAnimal = fotoAnimal;
    }

    public String getFotoAnimalContentType() {
        return fotoAnimalContentType;
    }

    public Animal fotoAnimalContentType(String fotoAnimalContentType) {
        this.fotoAnimalContentType = fotoAnimalContentType;
        return this;
    }

    public void setFotoAnimalContentType(String fotoAnimalContentType) {
        this.fotoAnimalContentType = fotoAnimalContentType;
    }

    public String getNomeAnimal() {
        return nomeAnimal;
    }

    public Animal nomeAnimal(String nomeAnimal) {
        this.nomeAnimal = nomeAnimal;
        return this;
    }

    public void setNomeAnimal(String nomeAnimal) {
        this.nomeAnimal = nomeAnimal;
    }

    public String getSexo() {
        return sexo;
    }

    public Animal sexo(String sexo) {
        this.sexo = sexo;
        return this;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getPelagem() {
        return pelagem;
    }

    public Animal pelagem(String pelagem) {
        this.pelagem = pelagem;
        return this;
    }

    public void setPelagem(String pelagem) {
        this.pelagem = pelagem;
    }

    public String getObsTosa() {
        return obsTosa;
    }

    public Animal obsTosa(String obsTosa) {
        this.obsTosa = obsTosa;
        return this;
    }

    public void setObsTosa(String obsTosa) {
        this.obsTosa = obsTosa;
    }

    public LocalDate getNascimento() {
        return nascimento;
    }

    public Animal nascimento(LocalDate nascimento) {
        this.nascimento = nascimento;
        return this;
    }

    public void setNascimento(LocalDate nascimento) {
        this.nascimento = nascimento;
    }

    public TpPorte getPorte() {
        return porte;
    }

    public Animal porte(TpPorte porte) {
        this.porte = porte;
        return this;
    }

    public void setPorte(TpPorte porte) {
        this.porte = porte;
    }

    public Raca getRaca() {
        return raca;
    }

    public Animal raca(Raca raca) {
        this.raca = raca;
        return this;
    }

    public void setRaca(Raca raca) {
        this.raca = raca;
    }

    public Especie getEspecie() {
        return especie;
    }

    public Animal especie(Especie especie) {
        this.especie = especie;
        return this;
    }

    public void setEspecie(Especie especie) {
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
        Animal animal = (Animal) o;
        if (animal.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), animal.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Animal{" +
            "id=" + getId() +
            ", fotoAnimal='" + getFotoAnimal() + "'" +
            ", fotoAnimalContentType='" + fotoAnimalContentType + "'" +
            ", nomeAnimal='" + getNomeAnimal() + "'" +
            ", sexo='" + getSexo() + "'" +
            ", pelagem='" + getPelagem() + "'" +
            ", obsTosa='" + getObsTosa() + "'" +
            ", nascimento='" + getNascimento() + "'" +
            ", porte='" + getPorte() + "'" +
            "}";
    }
}
