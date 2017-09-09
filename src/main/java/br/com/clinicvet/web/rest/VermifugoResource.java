package br.com.clinicvet.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.clinicvet.domain.Vermifugo;

import br.com.clinicvet.repository.VermifugoRepository;
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
 * REST controller for managing Vermifugo.
 */
@RestController
@RequestMapping("/api")
public class VermifugoResource {

    private final Logger log = LoggerFactory.getLogger(VermifugoResource.class);

    private static final String ENTITY_NAME = "vermifugo";

    private final VermifugoRepository vermifugoRepository;
    public VermifugoResource(VermifugoRepository vermifugoRepository) {
        this.vermifugoRepository = vermifugoRepository;
    }

    /**
     * POST  /vermifugos : Create a new vermifugo.
     *
     * @param vermifugo the vermifugo to create
     * @return the ResponseEntity with status 201 (Created) and with body the new vermifugo, or with status 400 (Bad Request) if the vermifugo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/vermifugos")
    @Timed
    public ResponseEntity<Vermifugo> createVermifugo(@RequestBody Vermifugo vermifugo) throws URISyntaxException {
        log.debug("REST request to save Vermifugo : {}", vermifugo);
        if (vermifugo.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new vermifugo cannot already have an ID")).body(null);
        }
        Vermifugo result = vermifugoRepository.save(vermifugo);
        return ResponseEntity.created(new URI("/api/vermifugos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /vermifugos : Updates an existing vermifugo.
     *
     * @param vermifugo the vermifugo to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated vermifugo,
     * or with status 400 (Bad Request) if the vermifugo is not valid,
     * or with status 500 (Internal Server Error) if the vermifugo couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/vermifugos")
    @Timed
    public ResponseEntity<Vermifugo> updateVermifugo(@RequestBody Vermifugo vermifugo) throws URISyntaxException {
        log.debug("REST request to update Vermifugo : {}", vermifugo);
        if (vermifugo.getId() == null) {
            return createVermifugo(vermifugo);
        }
        Vermifugo result = vermifugoRepository.save(vermifugo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, vermifugo.getId().toString()))
            .body(result);
    }

    /**
     * GET  /vermifugos : get all the vermifugos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of vermifugos in body
     */
    @GetMapping("/vermifugos")
    @Timed
    public List<Vermifugo> getAllVermifugos() {
        log.debug("REST request to get all Vermifugos");
        return vermifugoRepository.findAll();
        }

    /**
     * GET  /vermifugos/:id : get the "id" vermifugo.
     *
     * @param id the id of the vermifugo to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the vermifugo, or with status 404 (Not Found)
     */
    @GetMapping("/vermifugos/{id}")
    @Timed
    public ResponseEntity<Vermifugo> getVermifugo(@PathVariable Long id) {
        log.debug("REST request to get Vermifugo : {}", id);
        Vermifugo vermifugo = vermifugoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(vermifugo));
    }

    /**
     * DELETE  /vermifugos/:id : delete the "id" vermifugo.
     *
     * @param id the id of the vermifugo to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/vermifugos/{id}")
    @Timed
    public ResponseEntity<Void> deleteVermifugo(@PathVariable Long id) {
        log.debug("REST request to delete Vermifugo : {}", id);
        vermifugoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
