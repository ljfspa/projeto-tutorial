package br.com.clinicvet.repository;

import br.com.clinicvet.domain.Tratamento;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Tratamento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TratamentoRepository extends JpaRepository<Tratamento, Long> {

}
