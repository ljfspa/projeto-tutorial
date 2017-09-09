package br.com.clinicvet.web.rest;

import br.com.clinicvet.ClinicvetApp;

import br.com.clinicvet.domain.Vacina;
import br.com.clinicvet.repository.VacinaRepository;
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
 * Test class for the VacinaResource REST controller.
 *
 * @see VacinaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ClinicvetApp.class)
public class VacinaResourceIntTest {

    private static final String DEFAULT_VACINA_NAME = "AAAAAAAAAA";
    private static final String UPDATED_VACINA_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_APLIC_VACINA = "AAAAAAAAAA";
    private static final String UPDATED_APLIC_VACINA = "BBBBBBBBBB";

    @Autowired
    private VacinaRepository vacinaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVacinaMockMvc;

    private Vacina vacina;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VacinaResource vacinaResource = new VacinaResource(vacinaRepository);
        this.restVacinaMockMvc = MockMvcBuilders.standaloneSetup(vacinaResource)
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
    public static Vacina createEntity(EntityManager em) {
        Vacina vacina = new Vacina()
            .vacinaName(DEFAULT_VACINA_NAME)
            .aplicVacina(DEFAULT_APLIC_VACINA);
        return vacina;
    }

    @Before
    public void initTest() {
        vacina = createEntity(em);
    }

    @Test
    @Transactional
    public void createVacina() throws Exception {
        int databaseSizeBeforeCreate = vacinaRepository.findAll().size();

        // Create the Vacina
        restVacinaMockMvc.perform(post("/api/vacinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vacina)))
            .andExpect(status().isCreated());

        // Validate the Vacina in the database
        List<Vacina> vacinaList = vacinaRepository.findAll();
        assertThat(vacinaList).hasSize(databaseSizeBeforeCreate + 1);
        Vacina testVacina = vacinaList.get(vacinaList.size() - 1);
        assertThat(testVacina.getVacinaName()).isEqualTo(DEFAULT_VACINA_NAME);
        assertThat(testVacina.getAplicVacina()).isEqualTo(DEFAULT_APLIC_VACINA);
    }

    @Test
    @Transactional
    public void createVacinaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = vacinaRepository.findAll().size();

        // Create the Vacina with an existing ID
        vacina.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVacinaMockMvc.perform(post("/api/vacinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vacina)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Vacina> vacinaList = vacinaRepository.findAll();
        assertThat(vacinaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVacinas() throws Exception {
        // Initialize the database
        vacinaRepository.saveAndFlush(vacina);

        // Get all the vacinaList
        restVacinaMockMvc.perform(get("/api/vacinas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vacina.getId().intValue())))
            .andExpect(jsonPath("$.[*].vacinaName").value(hasItem(DEFAULT_VACINA_NAME.toString())))
            .andExpect(jsonPath("$.[*].aplicVacina").value(hasItem(DEFAULT_APLIC_VACINA.toString())));
    }

    @Test
    @Transactional
    public void getVacina() throws Exception {
        // Initialize the database
        vacinaRepository.saveAndFlush(vacina);

        // Get the vacina
        restVacinaMockMvc.perform(get("/api/vacinas/{id}", vacina.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(vacina.getId().intValue()))
            .andExpect(jsonPath("$.vacinaName").value(DEFAULT_VACINA_NAME.toString()))
            .andExpect(jsonPath("$.aplicVacina").value(DEFAULT_APLIC_VACINA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVacina() throws Exception {
        // Get the vacina
        restVacinaMockMvc.perform(get("/api/vacinas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVacina() throws Exception {
        // Initialize the database
        vacinaRepository.saveAndFlush(vacina);
        int databaseSizeBeforeUpdate = vacinaRepository.findAll().size();

        // Update the vacina
        Vacina updatedVacina = vacinaRepository.findOne(vacina.getId());
        updatedVacina
            .vacinaName(UPDATED_VACINA_NAME)
            .aplicVacina(UPDATED_APLIC_VACINA);

        restVacinaMockMvc.perform(put("/api/vacinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVacina)))
            .andExpect(status().isOk());

        // Validate the Vacina in the database
        List<Vacina> vacinaList = vacinaRepository.findAll();
        assertThat(vacinaList).hasSize(databaseSizeBeforeUpdate);
        Vacina testVacina = vacinaList.get(vacinaList.size() - 1);
        assertThat(testVacina.getVacinaName()).isEqualTo(UPDATED_VACINA_NAME);
        assertThat(testVacina.getAplicVacina()).isEqualTo(UPDATED_APLIC_VACINA);
    }

    @Test
    @Transactional
    public void updateNonExistingVacina() throws Exception {
        int databaseSizeBeforeUpdate = vacinaRepository.findAll().size();

        // Create the Vacina

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVacinaMockMvc.perform(put("/api/vacinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(vacina)))
            .andExpect(status().isCreated());

        // Validate the Vacina in the database
        List<Vacina> vacinaList = vacinaRepository.findAll();
        assertThat(vacinaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVacina() throws Exception {
        // Initialize the database
        vacinaRepository.saveAndFlush(vacina);
        int databaseSizeBeforeDelete = vacinaRepository.findAll().size();

        // Get the vacina
        restVacinaMockMvc.perform(delete("/api/vacinas/{id}", vacina.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Vacina> vacinaList = vacinaRepository.findAll();
        assertThat(vacinaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Vacina.class);
        Vacina vacina1 = new Vacina();
        vacina1.setId(1L);
        Vacina vacina2 = new Vacina();
        vacina2.setId(vacina1.getId());
        assertThat(vacina1).isEqualTo(vacina2);
        vacina2.setId(2L);
        assertThat(vacina1).isNotEqualTo(vacina2);
        vacina1.setId(null);
        assertThat(vacina1).isNotEqualTo(vacina2);
    }
}
