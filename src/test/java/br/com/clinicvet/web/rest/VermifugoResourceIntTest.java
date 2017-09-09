package br.com.clinicvet.web.rest;

import br.com.clinicvet.ClinicvetApp;

import br.com.clinicvet.domain.Vermifugo;
import br.com.clinicvet.repository.VermifugoRepository;
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
 * Test class for the VermifugoResource REST controller.
 *
 * @see VermifugoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ClinicvetApp.class)
public class VermifugoResourceIntTest {

    private static final String DEFAULT_VERMIFUGO_NAME = "AAAAAAAAAA";
    private static final String UPDATED_VERMIFUGO_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_APLIC_VERMIFUGO = "AAAAAAAAAA";
    private static final String UPDATED_APLIC_VERMIFUGO = "BBBBBBBBBB";

    @Autowired
    private VermifugoRepository vermifugoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVermifugoMockMvc;

    private Vermifugo vermifugo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VermifugoResource vermifugoResource = new VermifugoResource(vermifugoRepository);
        this.restVermifugoMockMvc = MockMvcBuilders.standaloneSetup(vermifugoResource)
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
    public static Vermifugo createEntity(EntityManager em) {
        Vermifugo vermifugo = new Vermifugo()
            .vermifugoName(DEFAULT_VERMIFUGO_NAME)
            .aplicVermifugo(DEFAULT_APLIC_VERMIFUGO);
        return vermifugo;
    }

    @Before
    public void initTest() {
        vermifugo = createEntity(em);
    }

    @Test
    @Transactional
    public void createVermifugo() throws Exception {
        int databaseSizeBeforeCreate = vermifugoRepository.findAll().size();

        // Create the Vermifugo
        restVermifugoMockMvc.perform(post("/api/vermifugos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vermifugo)))
            .andExpect(status().isCreated());

        // Validate the Vermifugo in the database
        List<Vermifugo> vermifugoList = vermifugoRepository.findAll();
        assertThat(vermifugoList).hasSize(databaseSizeBeforeCreate + 1);
        Vermifugo testVermifugo = vermifugoList.get(vermifugoList.size() - 1);
        assertThat(testVermifugo.getVermifugoName()).isEqualTo(DEFAULT_VERMIFUGO_NAME);
        assertThat(testVermifugo.getAplicVermifugo()).isEqualTo(DEFAULT_APLIC_VERMIFUGO);
    }

    @Test
    @Transactional
    public void createVermifugoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vermifugoRepository.findAll().size();

        // Create the Vermifugo with an existing ID
        vermifugo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVermifugoMockMvc.perform(post("/api/vermifugos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vermifugo)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Vermifugo> vermifugoList = vermifugoRepository.findAll();
        assertThat(vermifugoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVermifugos() throws Exception {
        // Initialize the database
        vermifugoRepository.saveAndFlush(vermifugo);

        // Get all the vermifugoList
        restVermifugoMockMvc.perform(get("/api/vermifugos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vermifugo.getId().intValue())))
            .andExpect(jsonPath("$.[*].vermifugoName").value(hasItem(DEFAULT_VERMIFUGO_NAME.toString())))
            .andExpect(jsonPath("$.[*].aplicVermifugo").value(hasItem(DEFAULT_APLIC_VERMIFUGO.toString())));
    }

    @Test
    @Transactional
    public void getVermifugo() throws Exception {
        // Initialize the database
        vermifugoRepository.saveAndFlush(vermifugo);

        // Get the vermifugo
        restVermifugoMockMvc.perform(get("/api/vermifugos/{id}", vermifugo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vermifugo.getId().intValue()))
            .andExpect(jsonPath("$.vermifugoName").value(DEFAULT_VERMIFUGO_NAME.toString()))
            .andExpect(jsonPath("$.aplicVermifugo").value(DEFAULT_APLIC_VERMIFUGO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVermifugo() throws Exception {
        // Get the vermifugo
        restVermifugoMockMvc.perform(get("/api/vermifugos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVermifugo() throws Exception {
        // Initialize the database
        vermifugoRepository.saveAndFlush(vermifugo);
        int databaseSizeBeforeUpdate = vermifugoRepository.findAll().size();

        // Update the vermifugo
        Vermifugo updatedVermifugo = vermifugoRepository.findOne(vermifugo.getId());
        updatedVermifugo
            .vermifugoName(UPDATED_VERMIFUGO_NAME)
            .aplicVermifugo(UPDATED_APLIC_VERMIFUGO);

        restVermifugoMockMvc.perform(put("/api/vermifugos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVermifugo)))
            .andExpect(status().isOk());

        // Validate the Vermifugo in the database
        List<Vermifugo> vermifugoList = vermifugoRepository.findAll();
        assertThat(vermifugoList).hasSize(databaseSizeBeforeUpdate);
        Vermifugo testVermifugo = vermifugoList.get(vermifugoList.size() - 1);
        assertThat(testVermifugo.getVermifugoName()).isEqualTo(UPDATED_VERMIFUGO_NAME);
        assertThat(testVermifugo.getAplicVermifugo()).isEqualTo(UPDATED_APLIC_VERMIFUGO);
    }

    @Test
    @Transactional
    public void updateNonExistingVermifugo() throws Exception {
        int databaseSizeBeforeUpdate = vermifugoRepository.findAll().size();

        // Create the Vermifugo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVermifugoMockMvc.perform(put("/api/vermifugos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vermifugo)))
            .andExpect(status().isCreated());

        // Validate the Vermifugo in the database
        List<Vermifugo> vermifugoList = vermifugoRepository.findAll();
        assertThat(vermifugoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVermifugo() throws Exception {
        // Initialize the database
        vermifugoRepository.saveAndFlush(vermifugo);
        int databaseSizeBeforeDelete = vermifugoRepository.findAll().size();

        // Get the vermifugo
        restVermifugoMockMvc.perform(delete("/api/vermifugos/{id}", vermifugo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Vermifugo> vermifugoList = vermifugoRepository.findAll();
        assertThat(vermifugoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vermifugo.class);
        Vermifugo vermifugo1 = new Vermifugo();
        vermifugo1.setId(1L);
        Vermifugo vermifugo2 = new Vermifugo();
        vermifugo2.setId(vermifugo1.getId());
        assertThat(vermifugo1).isEqualTo(vermifugo2);
        vermifugo2.setId(2L);
        assertThat(vermifugo1).isNotEqualTo(vermifugo2);
        vermifugo1.setId(null);
        assertThat(vermifugo1).isNotEqualTo(vermifugo2);
    }
}
