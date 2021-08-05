package br.com.lincon.sched.repositories;

import br.com.lincon.sched.entities.Secretaria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SecretariaRepository extends JpaRepository<Secretaria, Long> {
  Optional<Secretaria> findByIsMain(boolean isMain);

  Optional<Secretaria> findByUserId(Long id);
}
