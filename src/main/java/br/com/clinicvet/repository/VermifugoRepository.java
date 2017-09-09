package br.com.clinicvet.repository;

import br.com.clinicvet.domain.Vermifugo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Vermifugo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VermifugoRepository extends JpaRepository<Vermifugo, Long> {

}
