package br.com.clinicvet.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.clinicvet.domain.Tratamento;

import br.com.clinicvet.repository.TratamentoRepository;
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
 * REST controller for managing Tratamento.
 */
@RestController
@RequestMapping("/api")
public class TratamentoResource {

    private final Logger log = LoggerFactory.getLogger(TratamentoResource.class);

    private static final String ENTITY_NAME = "tratamento";

    private final TratamentoRepository tratamentoRepository;
    public TratamentoResource(TratamentoRepository tratamentoRepository) {
        this.tratamentoRepository = tratamentoRepository;
    }

    /**
     * POST  /tratamentos : Create a new tratamento.
     *
     * @param tratamento the tratamento to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tratamento, or with status 400 (Bad Request) if the tratamento has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/tratamentos")
    @Timed
    public ResponseEntity<Tratamento> createTratamento(@RequestBody Tratamento tratamento) throws URISyntaxException {
        log.debug("REST request to save Tratamento : {}", tratamento);
        if (tratamento.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tratamento cannot already have an ID")).body(null);
        }
        Tratamento result = tratamentoRepository.save(tratamento);
        return ResponseEntity.created(new URI("/api/tratamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /tratamentos : Updates an existing tratamento.
     *
     * @param tratamento the tratamento to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tratamento,
     * or with status 400 (Bad Request) if the tratamento is not valid,
     * or with status 500 (Internal Server Error) if the tratamento couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/tratamentos")
    @Timed
    public ResponseEntity<Tratamento> updateTratamento(@RequestBody Tratamento tratamento) throws URISyntaxException {
        log.debug("REST request to update Tratamento : {}", tratamento);
        if (tratamento.getId() == null) {
            return createTratamento(tratamento);
        }
        Tratamento result = tratamentoRepository.save(tratamento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tratamento.getId().toString()))
            .body(result);
    }

    /**
     * GET  /tratamentos : get all the tratamentos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of tratamentos in body
     */
    @GetMapping("/tratamentos")
    @Timed
    public List<Tratamento> getAllTratamentos() {
        log.debug("REST request to get all Tratamentos");
        return tratamentoRepository.findAll();
        }

    /**
     * GET  /tratamentos/:id : get the "id" tratamento.
     *
     * @param id the id of the tratamento to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tratamento, or with status 404 (Not Found)
     */
    @GetMapping("/tratamentos/{id}")
    @Timed
    public ResponseEntity<Tratamento> getTratamento(@PathVariable Long id) {
        log.debug("REST request to get Tratamento : {}", id);
        Tratamento tratamento = tratamentoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tratamento));
    }

    /**
     * DELETE  /tratamentos/:id : delete the "id" tratamento.
     *
     * @param id the id of the tratamento to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/tratamentos/{id}")
    @Timed
    public ResponseEntity<Void> deleteTratamento(@PathVariable Long id) {
        log.debug("REST request to delete Tratamento : {}", id);
        tratamentoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
