package br.com.clinicvet.web.rest;

import br.com.clinicvet.ClinicvetApp;

import br.com.clinicvet.domain.Animal;
import br.com.clinicvet.repository.AnimalRepository;
import br.com.clinicvet.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.clinicvet.domain.enumeration.TpPorte;
/**
 * Test class for the AnimalResource REST controller.
 *
 * @see AnimalResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ClinicvetApp.class)
public class AnimalResourceIntTest {

    private static final byte[] DEFAULT_FOTO_ANIMAL = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FOTO_ANIMAL = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_FOTO_ANIMAL_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FOTO_ANIMAL_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_NOME_ANIMAL = "AAAAAAAAAA";
    private static final String UPDATED_NOME_ANIMAL = "BBBBBBBBBB";

    private static final String DEFAULT_SEXO = "AAAAAAAAAA";
    private static final String UPDATED_SEXO = "BBBBBBBBBB";

    private static final String DEFAULT_PELAGEM = "AAAAAAAAAA";
    private static final String UPDATED_PELAGEM = "BBBBBBBBBB";

    private static final String DEFAULT_OBS_TOSA = "AAAAAAAAAA";
    private static final String UPDATED_OBS_TOSA = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_NASCIMENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_NASCIMENTO = LocalDate.now(ZoneId.systemDefault());

    private static final TpPorte DEFAULT_PORTE = TpPorte.PEQUENO;
    private static final TpPorte UPDATED_PORTE = TpPorte.MEDIO;

    @Autowired
    private AnimalRepository animalRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAnimalMockMvc;

    private Animal animal;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AnimalResource animalResource = new AnimalResource(animalRepository);
        this.restAnimalMockMvc = MockMvcBuilders.standaloneSetup(animalResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Animal createEntity(EntityManager em) {
        Animal animal = new Animal()
            .fotoAnimal(DEFAULT_FOTO_ANIMAL)
            .fotoAnimalContentType(DEFAULT_FOTO_ANIMAL_CONTENT_TYPE)
            .nomeAnimal(DEFAULT_NOME_ANIMAL)
            .sexo(DEFAULT_SEXO)
            .pelagem(DEFAULT_PELAGEM)
            .obsTosa(DEFAULT_OBS_TOSA)
            .nascimento(DEFAULT_NASCIMENTO)
            .porte(DEFAULT_PORTE);
        return animal;
    }

    @Before
    public void initTest() {
        animal = createEntity(em);
    }

    @Test
    @Transactional
    public void createAnimal() throws Exception {
        int databaseSizeBeforeCreate = animalRepository.findAll().size();

        // Create the Animal
        restAnimalMockMvc.perform(post("/api/animals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(animal)))
            .andExpect(status().isCreated());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeCreate + 1);
        Animal testAnimal = animalList.get(animalList.size() - 1);
        assertThat(testAnimal.getFotoAnimal()).isEqualTo(DEFAULT_FOTO_ANIMAL);
        assertThat(testAnimal.getFotoAnimalContentType()).isEqualTo(DEFAULT_FOTO_ANIMAL_CONTENT_TYPE);
        assertThat(testAnimal.getNomeAnimal()).isEqualTo(DEFAULT_NOME_ANIMAL);
        assertThat(testAnimal.getSexo()).isEqualTo(DEFAULT_SEXO);
        assertThat(testAnimal.getPelagem()).isEqualTo(DEFAULT_PELAGEM);
        assertThat(testAnimal.getObsTosa()).isEqualTo(DEFAULT_OBS_TOSA);
        assertThat(testAnimal.getNascimento()).isEqualTo(DEFAULT_NASCIMENTO);
        assertThat(testAnimal.getPorte()).isEqualTo(DEFAULT_PORTE);
    }

    @Test
    @Transactional
    public void createAnimalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = animalRepository.findAll().size();

        // Create the Animal with an existing ID
        animal.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAnimalMockMvc.perform(post("/api/animals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(animal)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAnimals() throws Exception {
        // Initialize the database
        animalRepository.saveAndFlush(animal);

        // Get all the animalList
        restAnimalMockMvc.perform(get("/api/animals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(animal.getId().intValue())))
            .andExpect(jsonPath("$.[*].fotoAnimalContentType").value(hasItem(DEFAULT_FOTO_ANIMAL_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fotoAnimal").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOTO_ANIMAL))))
            .andExpect(jsonPath("$.[*].nomeAnimal").value(hasItem(DEFAULT_NOME_ANIMAL.toString())))
            .andExpect(jsonPath("$.[*].sexo").value(hasItem(DEFAULT_SEXO.toString())))
            .andExpect(jsonPath("$.[*].pelagem").value(hasItem(DEFAULT_PELAGEM.toString())))
            .andExpect(jsonPath("$.[*].obsTosa").value(hasItem(DEFAULT_OBS_TOSA.toString())))
            .andExpect(jsonPath("$.[*].nascimento").value(hasItem(DEFAULT_NASCIMENTO.toString())))
            .andExpect(jsonPath("$.[*].porte").value(hasItem(DEFAULT_PORTE.toString())));
    }

    @Test
    @Transactional
    public void getAnimal() throws Exception {
        // Initialize the database
        animalRepository.saveAndFlush(animal);

        // Get the animal
        restAnimalMockMvc.perform(get("/api/animals/{id}", animal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(animal.getId().intValue()))
            .andExpect(jsonPath("$.fotoAnimalContentType").value(DEFAULT_FOTO_ANIMAL_CONTENT_TYPE))
            .andExpect(jsonPath("$.fotoAnimal").value(Base64Utils.encodeToString(DEFAULT_FOTO_ANIMAL)))
            .andExpect(jsonPath("$.nomeAnimal").value(DEFAULT_NOME_ANIMAL.toString()))
            .andExpect(jsonPath("$.sexo").value(DEFAULT_SEXO.toString()))
            .andExpect(jsonPath("$.pelagem").value(DEFAULT_PELAGEM.toString()))
            .andExpect(jsonPath("$.obsTosa").value(DEFAULT_OBS_TOSA.toString()))
            .andExpect(jsonPath("$.nascimento").value(DEFAULT_NASCIMENTO.toString()))
            .andExpect(jsonPath("$.porte").value(DEFAULT_PORTE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAnimal() throws Exception {
        // Get the animal
        restAnimalMockMvc.perform(get("/api/animals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAnimal() throws Exception {
        // Initialize the database
        animalRepository.saveAndFlush(animal);
        int databaseSizeBeforeUpdate = animalRepository.findAll().size();

        // Update the animal
        Animal updatedAnimal = animalRepository.findOne(animal.getId());
        updatedAnimal
            .fotoAnimal(UPDATED_FOTO_ANIMAL)
            .fotoAnimalContentType(UPDATED_FOTO_ANIMAL_CONTENT_TYPE)
            .nomeAnimal(UPDATED_NOME_ANIMAL)
            .sexo(UPDATED_SEXO)
            .pelagem(UPDATED_PELAGEM)
            .obsTosa(UPDATED_OBS_TOSA)
            .nascimento(UPDATED_NASCIMENTO)
            .porte(UPDATED_PORTE);

        restAnimalMockMvc.perform(put("/api/animals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAnimal)))
            .andExpect(status().isOk());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeUpdate);
        Animal testAnimal = animalList.get(animalList.size() - 1);
        assertThat(testAnimal.getFotoAnimal()).isEqualTo(UPDATED_FOTO_ANIMAL);
        assertThat(testAnimal.getFotoAnimalContentType()).isEqualTo(UPDATED_FOTO_ANIMAL_CONTENT_TYPE);
        assertThat(testAnimal.getNomeAnimal()).isEqualTo(UPDATED_NOME_ANIMAL);
        assertThat(testAnimal.getSexo()).isEqualTo(UPDATED_SEXO);
        assertThat(testAnimal.getPelagem()).isEqualTo(UPDATED_PELAGEM);
        assertThat(testAnimal.getObsTosa()).isEqualTo(UPDATED_OBS_TOSA);
        assertThat(testAnimal.getNascimento()).isEqualTo(UPDATED_NASCIMENTO);
        assertThat(testAnimal.getPorte()).isEqualTo(UPDATED_PORTE);
    }

    @Test
    @Transactional
    public void updateNonExistingAnimal() throws Exception {
        int databaseSizeBeforeUpdate = animalRepository.findAll().size();

        // Create the Animal

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAnimalMockMvc.perform(put("/api/animals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(animal)))
            .andExpect(status().isCreated());

        // Validate the Animal in the database
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAnimal() throws Exception {
        // Initialize the database
        animalRepository.saveAndFlush(animal);
        int databaseSizeBeforeDelete = animalRepository.findAll().size();

        // Get the animal
        restAnimalMockMvc.perform(delete("/api/animals/{id}", animal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Animal> animalList = animalRepository.findAll();
        assertThat(animalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Animal.class);
        Animal animal1 = new Animal();
        animal1.setId(1L);
        Animal animal2 = new Animal();
        animal2.setId(animal1.getId());
        assertThat(animal1).isEqualTo(animal2);
        animal2.setId(2L);
        assertThat(animal1).isNotEqualTo(animal2);
        animal1.setId(null);
        assertThat(animal1).isNotEqualTo(animal2);
    }
}
