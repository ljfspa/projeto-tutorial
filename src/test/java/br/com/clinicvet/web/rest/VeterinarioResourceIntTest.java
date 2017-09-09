package br.com.clinicvet.web.rest;

import br.com.clinicvet.ClinicvetApp;

import br.com.clinicvet.domain.Veterinario;
import br.com.clinicvet.repository.VeterinarioRepository;
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
 * Test class for the VeterinarioResource REST controller.
 *
 * @see VeterinarioResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ClinicvetApp.class)
public class VeterinarioResourceIntTest {

    private static final String DEFAULT_NOME_VETERINARIO = "AAAAAAAAAA";
    private static final String UPDATED_NOME_VETERINARIO = "BBBBBBBBBB";

    private static final String DEFAULT_C_RMV = "AAAAAAAAAA";
    private static final String UPDATED_C_RMV = "BBBBBBBBBB";

    private static final String DEFAULT_ESPECIALIDADE = "AAAAAAAAAA";
    private static final String UPDATED_ESPECIALIDADE = "BBBBBBBBBB";

    @Autowired
    private VeterinarioRepository veterinarioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restVeterinarioMockMvc;

    private Veterinario veterinario;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VeterinarioResource veterinarioResource = new VeterinarioResource(veterinarioRepository);
        this.restVeterinarioMockMvc = MockMvcBuilders.standaloneSetup(veterinarioResource)
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
    public static Veterinario createEntity(EntityManager em) {
        Veterinario veterinario = new Veterinario()
            .nomeVeterinario(DEFAULT_NOME_VETERINARIO)
            .cRMV(DEFAULT_C_RMV)
            .especialidade(DEFAULT_ESPECIALIDADE);
        return veterinario;
    }

    @Before
    public void initTest() {
        veterinario = createEntity(em);
    }

    @Test
    @Transactional
    public void createVeterinario() throws Exception {
        int databaseSizeBeforeCreate = veterinarioRepository.findAll().size();

        // Create the Veterinario
        restVeterinarioMockMvc.perform(post("/api/veterinarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(veterinario)))
            .andExpect(status().isCreated());

        // Validate the Veterinario in the database
        List<Veterinario> veterinarioList = veterinarioRepository.findAll();
        assertThat(veterinarioList).hasSize(databaseSizeBeforeCreate + 1);
        Veterinario testVeterinario = veterinarioList.get(veterinarioList.size() - 1);
        assertThat(testVeterinario.getNomeVeterinario()).isEqualTo(DEFAULT_NOME_VETERINARIO);
        assertThat(testVeterinario.getcRMV()).isEqualTo(DEFAULT_C_RMV);
        assertThat(testVeterinario.getEspecialidade()).isEqualTo(DEFAULT_ESPECIALIDADE);
    }

    @Test
    @Transactional
    public void createVeterinarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = veterinarioRepository.findAll().size();

        // Create the Veterinario with an existing ID
        veterinario.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVeterinarioMockMvc.perform(post("/api/veterinarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(veterinario)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Veterinario> veterinarioList = veterinarioRepository.findAll();
        assertThat(veterinarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllVeterinarios() throws Exception {
        // Initialize the database
        veterinarioRepository.saveAndFlush(veterinario);

        // Get all the veterinarioList
        restVeterinarioMockMvc.perform(get("/api/veterinarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(veterinario.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomeVeterinario").value(hasItem(DEFAULT_NOME_VETERINARIO.toString())))
            .andExpect(jsonPath("$.[*].cRMV").value(hasItem(DEFAULT_C_RMV.toString())))
            .andExpect(jsonPath("$.[*].especialidade").value(hasItem(DEFAULT_ESPECIALIDADE.toString())));
    }

    @Test
    @Transactional
    public void getVeterinario() throws Exception {
        // Initialize the database
        veterinarioRepository.saveAndFlush(veterinario);

        // Get the veterinario
        restVeterinarioMockMvc.perform(get("/api/veterinarios/{id}", veterinario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(veterinario.getId().intValue()))
            .andExpect(jsonPath("$.nomeVeterinario").value(DEFAULT_NOME_VETERINARIO.toString()))
            .andExpect(jsonPath("$.cRMV").value(DEFAULT_C_RMV.toString()))
            .andExpect(jsonPath("$.especialidade").value(DEFAULT_ESPECIALIDADE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVeterinario() throws Exception {
        // Get the veterinario
        restVeterinarioMockMvc.perform(get("/api/veterinarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVeterinario() throws Exception {
        // Initialize the database
        veterinarioRepository.saveAndFlush(veterinario);
        int databaseSizeBeforeUpdate = veterinarioRepository.findAll().size();

        // Update the veterinario
        Veterinario updatedVeterinario = veterinarioRepository.findOne(veterinario.getId());
        updatedVeterinario
            .nomeVeterinario(UPDATED_NOME_VETERINARIO)
            .cRMV(UPDATED_C_RMV)
            .especialidade(UPDATED_ESPECIALIDADE);

        restVeterinarioMockMvc.perform(put("/api/veterinarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVeterinario)))
            .andExpect(status().isOk());

        // Validate the Veterinario in the database
        List<Veterinario> veterinarioList = veterinarioRepository.findAll();
        assertThat(veterinarioList).hasSize(databaseSizeBeforeUpdate);
        Veterinario testVeterinario = veterinarioList.get(veterinarioList.size() - 1);
        assertThat(testVeterinario.getNomeVeterinario()).isEqualTo(UPDATED_NOME_VETERINARIO);
        assertThat(testVeterinario.getcRMV()).isEqualTo(UPDATED_C_RMV);
        assertThat(testVeterinario.getEspecialidade()).isEqualTo(UPDATED_ESPECIALIDADE);
    }

    @Test
    @Transactional
    public void updateNonExistingVeterinario() throws Exception {
        int databaseSizeBeforeUpdate = veterinarioRepository.findAll().size();

        // Create the Veterinario

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restVeterinarioMockMvc.perform(put("/api/veterinarios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(veterinario)))
            .andExpect(status().isCreated());

        // Validate the Veterinario in the database
        List<Veterinario> veterinarioList = veterinarioRepository.findAll();
        assertThat(veterinarioList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteVeterinario() throws Exception {
        // Initialize the database
        veterinarioRepository.saveAndFlush(veterinario);
        int databaseSizeBeforeDelete = veterinarioRepository.findAll().size();

        // Get the veterinario
        restVeterinarioMockMvc.perform(delete("/api/veterinarios/{id}", veterinario.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Veterinario> veterinarioList = veterinarioRepository.findAll();
        assertThat(veterinarioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Veterinario.class);
        Veterinario veterinario1 = new Veterinario();
        veterinario1.setId(1L);
        Veterinario veterinario2 = new Veterinario();
        veterinario2.setId(veterinario1.getId());
        assertThat(veterinario1).isEqualTo(veterinario2);
        veterinario2.setId(2L);
        assertThat(veterinario1).isNotEqualTo(veterinario2);
        veterinario1.setId(null);
        assertThat(veterinario1).isNotEqualTo(veterinario2);
    }
}
