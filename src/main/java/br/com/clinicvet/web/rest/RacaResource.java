package br.com.clinicvet.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.clinicvet.domain.Raca;

import br.com.clinicvet.repository.RacaRepository;
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
 * REST controller for managing Raca.
 */
@RestController
@RequestMapping("/api")
public class RacaResource {

    private final Logger log = LoggerFactory.getLogger(RacaResource.class);

    private static final String ENTITY_NAME = "raca";

    private final RacaRepository racaRepository;
    public RacaResource(RacaRepository racaRepository) {
        this.racaRepository = racaRepository;
    }

    /**
     * POST  /racas : Create a new raca.
     *
     * @param raca the raca to create
     * @return the ResponseEntity with status 201 (Created) and with body the new raca, or with status 400 (Bad Request) if the raca has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/racas")
    @Timed
    public ResponseEntity<Raca> createRaca(@RequestBody Raca raca) throws URISyntaxException {
        log.debug("REST request to save Raca : {}", raca);
        if (raca.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new raca cannot already have an ID")).body(null);
        }
        Raca result = racaRepository.save(raca);
        return ResponseEntity.created(new URI("/api/racas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /racas : Updates an existing raca.
     *
     * @param raca the raca to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated raca,
     * or with status 400 (Bad Request) if the raca is not valid,
     * or with status 500 (Internal Server Error) if the raca couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/racas")
    @Timed
    public ResponseEntity<Raca> updateRaca(@RequestBody Raca raca) throws URISyntaxException {
        log.debug("REST request to update Raca : {}", raca);
        if (raca.getId() == null) {
            return createRaca(raca);
        }
        Raca result = racaRepository.save(raca);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, raca.getId().toString()))
            .body(result);
    }

    /**
     * GET  /racas : get all the racas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of racas in body
     */
    @GetMapping("/racas")
    @Timed
    public List<Raca> getAllRacas() {
        log.debug("REST request to get all Racas");
        return racaRepository.findAll();
        }

    /**
     * GET  /racas/:id : get the "id" raca.
     *
     * @param id the id of the raca to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the raca, or with status 404 (Not Found)
     */
    @GetMapping("/racas/{id}")
    @Timed
    public ResponseEntity<Raca> getRaca(@PathVariable Long id) {
        log.debug("REST request to get Raca : {}", id);
        Raca raca = racaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(raca));
    }

    /**
     * DELETE  /racas/:id : delete the "id" raca.
     *
     * @param id the id of the raca to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/racas/{id}")
    @Timed
    public ResponseEntity<Void> deleteRaca(@PathVariable Long id) {
        log.debug("REST request to delete Raca : {}", id);
        racaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
