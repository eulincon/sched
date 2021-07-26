package br.com.lincon.sched.dtos;

import br.com.lincon.sched.entities.UserType;
import br.com.lincon.sched.entities.Usuario;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class UsuarioRequest {

  @NotBlank
  private String name;
  @NotBlank
  @CPF
  private String cpf;
  @NotBlank
  @Email
  private String email;
  @NotBlank
  private String password;

  public Usuario toModel() {
    return Usuario.builder().name(this.name).cpf(this.cpf).email(this.email).password(new BCryptPasswordEncoder().encode(this.password)).type(UserType.PATIENT).build();
  }
}
