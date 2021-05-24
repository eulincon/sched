package br.com.lincon.sched.repositories;

import br.com.lincon.sched.entities.Consultorio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsultorioRepository extends JpaRepository<Consultorio, Long> {
}
