package br.com.clinicvet.repository;

import br.com.clinicvet.domain.Bairro;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Bairro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BairroRepository extends JpaRepository<Bairro, Long> {

}
