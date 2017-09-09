package br.com.clinicvet.repository;

import br.com.clinicvet.domain.Veterinario;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Veterinario entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VeterinarioRepository extends JpaRepository<Veterinario, Long> {

}
