package br.com.clinicvet.web.rest;

import br.com.clinicvet.ClinicvetApp;

import br.com.clinicvet.domain.Consulta;
import br.com.clinicvet.repository.ConsultaRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ConsultaResource REST controller.
 *
 * @see ConsultaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ClinicvetApp.class)
public class ConsultaResourceIntTest {

    private static final LocalDate DEFAULT_DATA_CONSULTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_CONSULTA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_HORA_CONSULTA = "AAAAAAAAAA";
    private static final String UPDATED_HORA_CONSULTA = "BBBBBBBBBB";

    private static final String DEFAULT_MOTIVO_CONSULTA = "AAAAAAAAAA";
    private static final String UPDATED_MOTIVO_CONSULTA = "BBBBBBBBBB";

    private static final String DEFAULT_DESC_CONSULTA = "AAAAAAAAAA";
    private static final String UPDATED_DESC_CONSULTA = "BBBBBBBBBB";

    private static final String DEFAULT_RECETUARIO = "AAAAAAAAAA";
    private static final String UPDATED_RECETUARIO = "BBBBBBBBBB";

    private static final Long DEFAULT_PESAGEM = 1L;
    private static final Long UPDATED_PESAGEM = 2L;

    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConsultaMockMvc;

    private Consulta consulta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConsultaResource consultaResource = new ConsultaResource(consultaRepository);
        this.restConsultaMockMvc = MockMvcBuilders.standaloneSetup(consultaResource)
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
    public static Consulta createEntity(EntityManager em) {
        Consulta consulta = new Consulta()
            .dataConsulta(DEFAULT_DATA_CONSULTA)
            .horaConsulta(DEFAULT_HORA_CONSULTA)
            .motivoConsulta(DEFAULT_MOTIVO_CONSULTA)
            .descConsulta(DEFAULT_DESC_CONSULTA)
            .recetuario(DEFAULT_RECETUARIO)
            .pesagem(DEFAULT_PESAGEM);
        return consulta;
    }

    @Before
    public void initTest() {
        consulta = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsulta() throws Exception {
        int databaseSizeBeforeCreate = consultaRepository.findAll().size();

        // Create the Consulta
        restConsultaMockMvc.perform(post("/api/consultas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consulta)))
            .andExpect(status().isCreated());

        // Validate the Consulta in the database
        List<Consulta> consultaList = consultaRepository.findAll();
        assertThat(consultaList).hasSize(databaseSizeBeforeCreate + 1);
        Consulta testConsulta = consultaList.get(consultaList.size() - 1);
        assertThat(testConsulta.getDataConsulta()).isEqualTo(DEFAULT_DATA_CONSULTA);
        assertThat(testConsulta.getHoraConsulta()).isEqualTo(DEFAULT_HORA_CONSULTA);
        assertThat(testConsulta.getMotivoConsulta()).isEqualTo(DEFAULT_MOTIVO_CONSULTA);
        assertThat(testConsulta.getDescConsulta()).isEqualTo(DEFAULT_DESC_CONSULTA);
        assertThat(testConsulta.getRecetuario()).isEqualTo(DEFAULT_RECETUARIO);
        assertThat(testConsulta.getPesagem()).isEqualTo(DEFAULT_PESAGEM);
    }

    @Test
    @Transactional
    public void createConsultaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consultaRepository.findAll().size();

        // Create the Consulta with an existing ID
        consulta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsultaMockMvc.perform(post("/api/consultas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consulta)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Consulta> consultaList = consultaRepository.findAll();
        assertThat(consultaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllConsultas() throws Exception {
        // Initialize the database
        consultaRepository.saveAndFlush(consulta);

        // Get all the consultaList
        restConsultaMockMvc.perform(get("/api/consultas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consulta.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataConsulta").value(hasItem(DEFAULT_DATA_CONSULTA.toString())))
            .andExpect(jsonPath("$.[*].horaConsulta").value(hasItem(DEFAULT_HORA_CONSULTA.toString())))
            .andExpect(jsonPath("$.[*].motivoConsulta").value(hasItem(DEFAULT_MOTIVO_CONSULTA.toString())))
            .andExpect(jsonPath("$.[*].descConsulta").value(hasItem(DEFAULT_DESC_CONSULTA.toString())))
            .andExpect(jsonPath("$.[*].recetuario").value(hasItem(DEFAULT_RECETUARIO.toString())))
            .andExpect(jsonPath("$.[*].pesagem").value(hasItem(DEFAULT_PESAGEM.intValue())));
    }

    @Test
    @Transactional
    public void getConsulta() throws Exception {
        // Initialize the database
        consultaRepository.saveAndFlush(consulta);

        // Get the consulta
        restConsultaMockMvc.perform(get("/api/consultas/{id}", consulta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(consulta.getId().intValue()))
            .andExpect(jsonPath("$.dataConsulta").value(DEFAULT_DATA_CONSULTA.toString()))
            .andExpect(jsonPath("$.horaConsulta").value(DEFAULT_HORA_CONSULTA.toString()))
            .andExpect(jsonPath("$.motivoConsulta").value(DEFAULT_MOTIVO_CONSULTA.toString()))
            .andExpect(jsonPath("$.descConsulta").value(DEFAULT_DESC_CONSULTA.toString()))
            .andExpect(jsonPath("$.recetuario").value(DEFAULT_RECETUARIO.toString()))
            .andExpect(jsonPath("$.pesagem").value(DEFAULT_PESAGEM.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingConsulta() throws Exception {
        // Get the consulta
        restConsultaMockMvc.perform(get("/api/consultas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsulta() throws Exception {
        // Initialize the database
        consultaRepository.saveAndFlush(consulta);
        int databaseSizeBeforeUpdate = consultaRepository.findAll().size();

        // Update the consulta
        Consulta updatedConsulta = consultaRepository.findOne(consulta.getId());
        updatedConsulta
            .dataConsulta(UPDATED_DATA_CONSULTA)
            .horaConsulta(UPDATED_HORA_CONSULTA)
            .motivoConsulta(UPDATED_MOTIVO_CONSULTA)
            .descConsulta(UPDATED_DESC_CONSULTA)
            .recetuario(UPDATED_RECETUARIO)
            .pesagem(UPDATED_PESAGEM);

        restConsultaMockMvc.perform(put("/api/consultas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsulta)))
            .andExpect(status().isOk());

        // Validate the Consulta in the database
        List<Consulta> consultaList = consultaRepository.findAll();
        assertThat(consultaList).hasSize(databaseSizeBeforeUpdate);
        Consulta testConsulta = consultaList.get(consultaList.size() - 1);
        assertThat(testConsulta.getDataConsulta()).isEqualTo(UPDATED_DATA_CONSULTA);
        assertThat(testConsulta.getHoraConsulta()).isEqualTo(UPDATED_HORA_CONSULTA);
        assertThat(testConsulta.getMotivoConsulta()).isEqualTo(UPDATED_MOTIVO_CONSULTA);
        assertThat(testConsulta.getDescConsulta()).isEqualTo(UPDATED_DESC_CONSULTA);
        assertThat(testConsulta.getRecetuario()).isEqualTo(UPDATED_RECETUARIO);
        assertThat(testConsulta.getPesagem()).isEqualTo(UPDATED_PESAGEM);
    }

    @Test
    @Transactional
    public void updateNonExistingConsulta() throws Exception {
        int databaseSizeBeforeUpdate = consultaRepository.findAll().size();

        // Create the Consulta

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConsultaMockMvc.perform(put("/api/consultas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consulta)))
            .andExpect(status().isCreated());

        // Validate the Consulta in the database
        List<Consulta> consultaList = consultaRepository.findAll();
        assertThat(consultaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteConsulta() throws Exception {
        // Initialize the database
        consultaRepository.saveAndFlush(consulta);
        int databaseSizeBeforeDelete = consultaRepository.findAll().size();

        // Get the consulta
        restConsultaMockMvc.perform(delete("/api/consultas/{id}", consulta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Consulta> consultaList = consultaRepository.findAll();
        assertThat(consultaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Consulta.class);
        Consulta consulta1 = new Consulta();
        consulta1.setId(1L);
        Consulta consulta2 = new Consulta();
        consulta2.setId(consulta1.getId());
        assertThat(consulta1).isEqualTo(consulta2);
        consulta2.setId(2L);
        assertThat(consulta1).isNotEqualTo(consulta2);
        consulta1.setId(null);
        assertThat(consulta1).isNotEqualTo(consulta2);
    }
}
