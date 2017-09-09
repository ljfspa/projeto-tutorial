package br.com.clinicvet.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.com.clinicvet.domain.Bairro;

import br.com.clinicvet.repository.BairroRepository;
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
 * REST controller for managing Bairro.
 */
@RestController
@RequestMapping("/api")
public class BairroResource {

    private final Logger log = LoggerFactory.getLogger(BairroResource.class);

    private static final String ENTITY_NAME = "bairro";

    private final BairroRepository bairroRepository;
    public BairroResource(BairroRepository bairroRepository) {
        this.bairroRepository = bairroRepository;
    }

    /**
     * POST  /bairros : Create a new bairro.
     *
     * @param bairro the bairro to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bairro, or with status 400 (Bad Request) if the bairro has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bairros")
    @Timed
    public ResponseEntity<Bairro> createBairro(@RequestBody Bairro bairro) throws URISyntaxException {
        log.debug("REST request to save Bairro : {}", bairro);
        if (bairro.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new bairro cannot already have an ID")).body(null);
        }
        Bairro result = bairroRepository.save(bairro);
        return ResponseEntity.created(new URI("/api/bairros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bairros : Updates an existing bairro.
     *
     * @param bairro the bairro to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bairro,
     * or with status 400 (Bad Request) if the bairro is not valid,
     * or with status 500 (Internal Server Error) if the bairro couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bairros")
    @Timed
    public ResponseEntity<Bairro> updateBairro(@RequestBody Bairro bairro) throws URISyntaxException {
        log.debug("REST request to update Bairro : {}", bairro);
        if (bairro.getId() == null) {
            return createBairro(bairro);
        }
        Bairro result = bairroRepository.save(bairro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bairro.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bairros : get all the bairros.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bairros in body
     */
    @GetMapping("/bairros")
    @Timed
    public List<Bairro> getAllBairros() {
        log.debug("REST request to get all Bairros");
        return bairroRepository.findAll();
        }

    /**
     * GET  /bairros/:id : get the "id" bairro.
     *
     * @param id the id of the bairro to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bairro, or with status 404 (Not Found)
     */
    @GetMapping("/bairros/{id}")
    @Timed
    public ResponseEntity<Bairro> getBairro(@PathVariable Long id) {
        log.debug("REST request to get Bairro : {}", id);
        Bairro bairro = bairroRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bairro));
    }

    /**
     * DELETE  /bairros/:id : delete the "id" bairro.
     *
     * @param id the id of the bairro to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bairros/{id}")
    @Timed
    public ResponseEntity<Void> deleteBairro(@PathVariable Long id) {
        log.debug("REST request to delete Bairro : {}", id);
        bairroRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
