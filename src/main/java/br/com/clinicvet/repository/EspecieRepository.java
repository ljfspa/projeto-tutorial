package br.com.clinicvet.repository;

import br.com.clinicvet.domain.Especie;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Especie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EspecieRepository extends JpaRepository<Especie, Long> {

}
