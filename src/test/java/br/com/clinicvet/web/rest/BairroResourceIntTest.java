package br.com.clinicvet.web.rest;

import br.com.clinicvet.ClinicvetApp;

import br.com.clinicvet.domain.Bairro;
import br.com.clinicvet.repository.BairroRepository;
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

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the BairroResource REST controller.
 *
 * @see BairroResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ClinicvetApp.class)
public class BairroResourceIntTest {

    private static final String DEFAULT_BAIRRO = "AAAAAAAAAA";
    private static final String UPDATED_BAIRRO = "BBBBBBBBBB";

    @Autowired
    private BairroRepository bairroRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restBairroMockMvc;

    private Bairro bairro;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BairroResource bairroResource = new BairroResource(bairroRepository);
        this.restBairroMockMvc = MockMvcBuilders.standaloneSetup(bairroResource)
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
    public static Bairro createEntity(EntityManager em) {
        Bairro bairro = new Bairro()
            .bairro(DEFAULT_BAIRRO);
        return bairro;
    }

    @Before
    public void initTest() {
        bairro = createEntity(em);
    }

    @Test
    @Transactional
    public void createBairro() throws Exception {
        int databaseSizeBeforeCreate = bairroRepository.findAll().size();

        // Create the Bairro
        restBairroMockMvc.perform(post("/api/bairros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bairro)))
            .andExpect(status().isCreated());

        // Validate the Bairro in the database
        List<Bairro> bairroList = bairroRepository.findAll();
        assertThat(bairroList).hasSize(databaseSizeBeforeCreate + 1);
        Bairro testBairro = bairroList.get(bairroList.size() - 1);
        assertThat(testBairro.getBairro()).isEqualTo(DEFAULT_BAIRRO);
    }

    @Test
    @Transactional
    public void createBairroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = bairroRepository.findAll().size();

        // Create the Bairro with an existing ID
        bairro.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBairroMockMvc.perform(post("/api/bairros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bairro)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Bairro> bairroList = bairroRepository.findAll();
        assertThat(bairroList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllBairros() throws Exception {
        // Initialize the database
        bairroRepository.saveAndFlush(bairro);

        // Get all the bairroList
        restBairroMockMvc.perform(get("/api/bairros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(bairro.getId().intValue())))
            .andExpect(jsonPath("$.[*].bairro").value(hasItem(DEFAULT_BAIRRO.toString())));
    }

    @Test
    @Transactional
    public void getBairro() throws Exception {
        // Initialize the database
        bairroRepository.saveAndFlush(bairro);

        // Get the bairro
        restBairroMockMvc.perform(get("/api/bairros/{id}", bairro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bairro.getId().intValue()))
            .andExpect(jsonPath("$.bairro").value(DEFAULT_BAIRRO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingBairro() throws Exception {
        // Get the bairro
        restBairroMockMvc.perform(get("/api/bairros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBairro() throws Exception {
        // Initialize the database
        bairroRepository.saveAndFlush(bairro);
        int databaseSizeBeforeUpdate = bairroRepository.findAll().size();

        // Update the bairro
        Bairro updatedBairro = bairroRepository.findOne(bairro.getId());
        updatedBairro
            .bairro(UPDATED_BAIRRO);

        restBairroMockMvc.perform(put("/api/bairros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBairro)))
            .andExpect(status().isOk());

        // Validate the Bairro in the database
        List<Bairro> bairroList = bairroRepository.findAll();
        assertThat(bairroList).hasSize(databaseSizeBeforeUpdate);
        Bairro testBairro = bairroList.get(bairroList.size() - 1);
        assertThat(testBairro.getBairro()).isEqualTo(UPDATED_BAIRRO);
    }

    @Test
    @Transactional
    public void updateNonExistingBairro() throws Exception {
        int databaseSizeBeforeUpdate = bairroRepository.findAll().size();

        // Create the Bairro

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restBairroMockMvc.perform(put("/api/bairros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(bairro)))
            .andExpect(status().isCreated());

        // Validate the Bairro in the database
        List<Bairro> bairroList = bairroRepository.findAll();
        assertThat(bairroList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteBairro() throws Exception {
        // Initialize the database
        bairroRepository.saveAndFlush(bairro);
        int databaseSizeBeforeDelete = bairroRepository.findAll().size();

        // Get the bairro
        restBairroMockMvc.perform(delete("/api/bairros/{id}", bairro.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Bairro> bairroList = bairroRepository.findAll();
        assertThat(bairroList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Bairro.class);
        Bairro bairro1 = new Bairro();
        bairro1.setId(1L);
        Bairro bairro2 = new Bairro();
        bairro2.setId(bairro1.getId());
        assertThat(bairro1).isEqualTo(bairro2);
        bairro2.setId(2L);
        assertThat(bairro1).isNotEqualTo(bairro2);
        bairro1.setId(null);
        assertThat(bairro1).isNotEqualTo(bairro2);
    }
}
