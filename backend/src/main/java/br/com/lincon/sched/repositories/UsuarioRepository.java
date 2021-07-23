package br.com.lincon.sched.repositories;

import br.com.lincon.sched.entities.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
  Optional<Usuario> findByEmail(String email);
  Optional<Usuario> findByCpf(String userCpf);
}
