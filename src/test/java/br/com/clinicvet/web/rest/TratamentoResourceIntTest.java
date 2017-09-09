package br.com.clinicvet.web.rest;

import br.com.clinicvet.ClinicvetApp;

import br.com.clinicvet.domain.Tratamento;
import br.com.clinicvet.repository.TratamentoRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static br.com.clinicvet.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TratamentoResource REST controller.
 *
 * @see TratamentoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ClinicvetApp.class)
public class TratamentoResourceIntTest {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DATA_APLIC_TRAT = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATA_APLIC_TRAT = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private TratamentoRepository tratamentoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTratamentoMockMvc;

    private Tratamento tratamento;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TratamentoResource tratamentoResource = new TratamentoResource(tratamentoRepository);
        this.restTratamentoMockMvc = MockMvcBuilders.standaloneSetup(tratamentoResource)
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
    public static Tratamento createEntity(EntityManager em) {
        Tratamento tratamento = new Tratamento()
            .nome(DEFAULT_NOME)
            .descricao(DEFAULT_DESCRICAO)
            .dataAplicTrat(DEFAULT_DATA_APLIC_TRAT);
        return tratamento;
    }

    @Before
    public void initTest() {
        tratamento = createEntity(em);
    }

    @Test
    @Transactional
    public void createTratamento() throws Exception {
        int databaseSizeBeforeCreate = tratamentoRepository.findAll().size();

        // Create the Tratamento
        restTratamentoMockMvc.perform(post("/api/tratamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tratamento)))
            .andExpect(status().isCreated());

        // Validate the Tratamento in the database
        List<Tratamento> tratamentoList = tratamentoRepository.findAll();
        assertThat(tratamentoList).hasSize(databaseSizeBeforeCreate + 1);
        Tratamento testTratamento = tratamentoList.get(tratamentoList.size() - 1);
        assertThat(testTratamento.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTratamento.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testTratamento.getDataAplicTrat()).isEqualTo(DEFAULT_DATA_APLIC_TRAT);
    }

    @Test
    @Transactional
    public void createTratamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tratamentoRepository.findAll().size();

        // Create the Tratamento with an existing ID
        tratamento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTratamentoMockMvc.perform(post("/api/tratamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tratamento)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Tratamento> tratamentoList = tratamentoRepository.findAll();
        assertThat(tratamentoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTratamentos() throws Exception {
        // Initialize the database
        tratamentoRepository.saveAndFlush(tratamento);

        // Get all the tratamentoList
        restTratamentoMockMvc.perform(get("/api/tratamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tratamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())))
            .andExpect(jsonPath("$.[*].dataAplicTrat").value(hasItem(sameInstant(DEFAULT_DATA_APLIC_TRAT))));
    }

    @Test
    @Transactional
    public void getTratamento() throws Exception {
        // Initialize the database
        tratamentoRepository.saveAndFlush(tratamento);

        // Get the tratamento
        restTratamentoMockMvc.perform(get("/api/tratamentos/{id}", tratamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tratamento.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()))
            .andExpect(jsonPath("$.dataAplicTrat").value(sameInstant(DEFAULT_DATA_APLIC_TRAT)));
    }

    @Test
    @Transactional
    public void getNonExistingTratamento() throws Exception {
        // Get the tratamento
        restTratamentoMockMvc.perform(get("/api/tratamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTratamento() throws Exception {
        // Initialize the database
        tratamentoRepository.saveAndFlush(tratamento);
        int databaseSizeBeforeUpdate = tratamentoRepository.findAll().size();

        // Update the tratamento
        Tratamento updatedTratamento = tratamentoRepository.findOne(tratamento.getId());
        updatedTratamento
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .dataAplicTrat(UPDATED_DATA_APLIC_TRAT);

        restTratamentoMockMvc.perform(put("/api/tratamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTratamento)))
            .andExpect(status().isOk());

        // Validate the Tratamento in the database
        List<Tratamento> tratamentoList = tratamentoRepository.findAll();
        assertThat(tratamentoList).hasSize(databaseSizeBeforeUpdate);
        Tratamento testTratamento = tratamentoList.get(tratamentoList.size() - 1);
        assertThat(testTratamento.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTratamento.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testTratamento.getDataAplicTrat()).isEqualTo(UPDATED_DATA_APLIC_TRAT);
    }

    @Test
    @Transactional
    public void updateNonExistingTratamento() throws Exception {
        int databaseSizeBeforeUpdate = tratamentoRepository.findAll().size();

        // Create the Tratamento

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTratamentoMockMvc.perform(put("/api/tratamentos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tratamento)))
            .andExpect(status().isCreated());

        // Validate the Tratamento in the database
        List<Tratamento> tratamentoList = tratamentoRepository.findAll();
        assertThat(tratamentoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTratamento() throws Exception {
        // Initialize the database
        tratamentoRepository.saveAndFlush(tratamento);
        int databaseSizeBeforeDelete = tratamentoRepository.findAll().size();

        // Get the tratamento
        restTratamentoMockMvc.perform(delete("/api/tratamentos/{id}", tratamento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Tratamento> tratamentoList = tratamentoRepository.findAll();
        assertThat(tratamentoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tratamento.class);
        Tratamento tratamento1 = new Tratamento();
        tratamento1.setId(1L);
        Tratamento tratamento2 = new Tratamento();
        tratamento2.setId(tratamento1.getId());
        assertThat(tratamento1).isEqualTo(tratamento2);
        tratamento2.setId(2L);
        assertThat(tratamento1).isNotEqualTo(tratamento2);
        tratamento1.setId(null);
        assertThat(tratamento1).isNotEqualTo(tratamento2);
    }
}
