package br.com.clinicvet.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.clinicvet.domain.Agendamento;

import br.com.clinicvet.repository.AgendamentoRepository;
import br.com.clinicvet.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Agendamento.
 */
@RestController
@RequestMapping("/api")
public class AgendamentoResource {

    private final Logger log = LoggerFactory.getLogger(AgendamentoResource.class);

    private static final String ENTITY_NAME = "agendamento";

    private final AgendamentoRepository agendamentoRepository;
    public AgendamentoResource(AgendamentoRepository agendamentoRepository) {
        this.agendamentoRepository = agendamentoRepository;
    }

    /**
     * POST  /agendamentos : Create a new agendamento.
     *
     * @param agendamento the agendamento to create
     * @return the ResponseEntity with status 201 (Created) and with body the new agendamento, or with status 400 (Bad Request) if the agendamento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/agendamentos")
    @Timed
    public ResponseEntity<Agendamento> createAgendamento(@RequestBody Agendamento agendamento) throws URISyntaxException {
        log.debug("REST request to save Agendamento : {}", agendamento);
        if (agendamento.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new agendamento cannot already have an ID")).body(null);
        }
        Agendamento result = agendamentoRepository.save(agendamento);
        return ResponseEntity.created(new URI("/api/agendamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /agendamentos : Updates an existing agendamento.
     *
     * @param agendamento the agendamento to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated agendamento,
     * or with status 400 (Bad Request) if the agendamento is not valid,
     * or with status 500 (Internal Server Error) if the agendamento couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/agendamentos")
    @Timed
    public ResponseEntity<Agendamento> updateAgendamento(@RequestBody Agendamento agendamento) throws URISyntaxException {
        log.debug("REST request to update Agendamento : {}", agendamento);
        if (agendamento.getId() == null) {
            return createAgendamento(agendamento);
        }
        Agendamento result = agendamentoRepository.save(agendamento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, agendamento.getId().toString()))
            .body(result);
    }

    /**
     * GET  /agendamentos : get all the agendamentos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of agendamentos in body
     */
    @GetMapping("/agendamentos")
    @Timed
    public List<Agendamento> getAllAgendamentos() {
        log.debug("REST request to get all Agendamentos");
        return agendamentoRepository.findAll();
        }

    /**
     * GET  /agendamentos/:id : get the "id" agendamento.
     *
     * @param id the id of the agendamento to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the agendamento, or with status 404 (Not Found)
     */
    @GetMapping("/agendamentos/{id}")
    @Timed
    public ResponseEntity<Agendamento> getAgendamento(@PathVariable Long id) {
        log.debug("REST request to get Agendamento : {}", id);
        Agendamento agendamento = agendamentoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(agendamento));
    }

    /**
     * DELETE  /agendamentos/:id : delete the "id" agendamento.
     *
     * @param id the id of the agendamento to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/agendamentos/{id}")
    @Timed
    public ResponseEntity<Void> deleteAgendamento(@PathVariable Long id) {
        log.debug("REST request to delete Agendamento : {}", id);
        agendamentoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
