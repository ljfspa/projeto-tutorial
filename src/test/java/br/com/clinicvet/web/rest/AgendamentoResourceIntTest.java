package br.com.clinicvet.web.rest;

import br.com.clinicvet.ClinicvetApp;

import br.com.clinicvet.domain.Agendamento;
import br.com.clinicvet.repository.AgendamentoRepository;
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
 * Test class for the AgendamentoResource REST controller.
 *
 * @see AgendamentoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ClinicvetApp.class)
public class AgendamentoResourceIntTest {

    private static final LocalDate DEFAULT_DATA_AGENDA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_AGENDA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_HORA_AGENDA = "AAAAAAAAAA";
    private static final String UPDATED_HORA_AGENDA = "BBBBBBBBBB";

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAgendamentoMockMvc;

    private Agendamento agendamento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgendamentoResource agendamentoResource = new AgendamentoResource(agendamentoRepository);
        this.restAgendamentoMockMvc = MockMvcBuilders.standaloneSetup(agendamentoResource)
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
    public static Agendamento createEntity(EntityManager em) {
        Agendamento agendamento = new Agendamento()
            .dataAgenda(DEFAULT_DATA_AGENDA)
            .horaAgenda(DEFAULT_HORA_AGENDA);
        return agendamento;
    }

    @Before
    public void initTest() {
        agendamento = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgendamento() throws Exception {
        int databaseSizeBeforeCreate = agendamentoRepository.findAll().size();

        // Create the Agendamento
        restAgendamentoMockMvc.perform(post("/api/agendamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agendamento)))
            .andExpect(status().isCreated());

        // Validate the Agendamento in the database
        List<Agendamento> agendamentoList = agendamentoRepository.findAll();
        assertThat(agendamentoList).hasSize(databaseSizeBeforeCreate + 1);
        Agendamento testAgendamento = agendamentoList.get(agendamentoList.size() - 1);
        assertThat(testAgendamento.getDataAgenda()).isEqualTo(DEFAULT_DATA_AGENDA);
        assertThat(testAgendamento.getHoraAgenda()).isEqualTo(DEFAULT_HORA_AGENDA);
    }

    @Test
    @Transactional
    public void createAgendamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agendamentoRepository.findAll().size();

        // Create the Agendamento with an existing ID
        agendamento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgendamentoMockMvc.perform(post("/api/agendamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agendamento)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Agendamento> agendamentoList = agendamentoRepository.findAll();
        assertThat(agendamentoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAgendamentos() throws Exception {
        // Initialize the database
        agendamentoRepository.saveAndFlush(agendamento);

        // Get all the agendamentoList
        restAgendamentoMockMvc.perform(get("/api/agendamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agendamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].dataAgenda").value(hasItem(DEFAULT_DATA_AGENDA.toString())))
            .andExpect(jsonPath("$.[*].horaAgenda").value(hasItem(DEFAULT_HORA_AGENDA.toString())));
    }

    @Test
    @Transactional
    public void getAgendamento() throws Exception {
        // Initialize the database
        agendamentoRepository.saveAndFlush(agendamento);

        // Get the agendamento
        restAgendamentoMockMvc.perform(get("/api/agendamentos/{id}", agendamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agendamento.getId().intValue()))
            .andExpect(jsonPath("$.dataAgenda").value(DEFAULT_DATA_AGENDA.toString()))
            .andExpect(jsonPath("$.horaAgenda").value(DEFAULT_HORA_AGENDA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAgendamento() throws Exception {
        // Get the agendamento
        restAgendamentoMockMvc.perform(get("/api/agendamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgendamento() throws Exception {
        // Initialize the database
        agendamentoRepository.saveAndFlush(agendamento);
        int databaseSizeBeforeUpdate = agendamentoRepository.findAll().size();

        // Update the agendamento
        Agendamento updatedAgendamento = agendamentoRepository.findOne(agendamento.getId());
        updatedAgendamento
            .dataAgenda(UPDATED_DATA_AGENDA)
            .horaAgenda(UPDATED_HORA_AGENDA);

        restAgendamentoMockMvc.perform(put("/api/agendamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgendamento)))
            .andExpect(status().isOk());

        // Validate the Agendamento in the database
        List<Agendamento> agendamentoList = agendamentoRepository.findAll();
        assertThat(agendamentoList).hasSize(databaseSizeBeforeUpdate);
        Agendamento testAgendamento = agendamentoList.get(agendamentoList.size() - 1);
        assertThat(testAgendamento.getDataAgenda()).isEqualTo(UPDATED_DATA_AGENDA);
        assertThat(testAgendamento.getHoraAgenda()).isEqualTo(UPDATED_HORA_AGENDA);
    }

    @Test
    @Transactional
    public void updateNonExistingAgendamento() throws Exception {
        int databaseSizeBeforeUpdate = agendamentoRepository.findAll().size();

        // Create the Agendamento

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAgendamentoMockMvc.perform(put("/api/agendamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agendamento)))
            .andExpect(status().isCreated());

        // Validate the Agendamento in the database
        List<Agendamento> agendamentoList = agendamentoRepository.findAll();
        assertThat(agendamentoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAgendamento() throws Exception {
        // Initialize the database
        agendamentoRepository.saveAndFlush(agendamento);
        int databaseSizeBeforeDelete = agendamentoRepository.findAll().size();

        // Get the agendamento
        restAgendamentoMockMvc.perform(delete("/api/agendamentos/{id}", agendamento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Agendamento> agendamentoList = agendamentoRepository.findAll();
        assertThat(agendamentoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Agendamento.class);
        Agendamento agendamento1 = new Agendamento();
        agendamento1.setId(1L);
        Agendamento agendamento2 = new Agendamento();
        agendamento2.setId(agendamento1.getId());
        assertThat(agendamento1).isEqualTo(agendamento2);
        agendamento2.setId(2L);
        assertThat(agendamento1).isNotEqualTo(agendamento2);
        agendamento1.setId(null);
        assertThat(agendamento1).isNotEqualTo(agendamento2);
    }
}
