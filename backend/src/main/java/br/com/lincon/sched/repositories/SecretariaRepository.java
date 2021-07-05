package br.com.lincon.sched.repositories;

import br.com.lincon.sched.entities.Secretaria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SecretariaRepository extends JpaRepository<Secretaria, Long> {
    Secretaria findByIsMain(boolean isMain);
}
