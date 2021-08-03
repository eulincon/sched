package br.com.lincon.sched.dtos;

import br.com.lincon.sched.entities.Consultorio;
import br.com.lincon.sched.entities.Secretaria;
import br.com.lincon.sched.entities.UserType;
import br.com.lincon.sched.entities.Usuario;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
public class SecretariaRequest {
    private String name;
    @CPF
    private String cpf;
    @Email
    @NotNull
    private String email;
    private String address;
    private boolean isMain;
    private Long clinicId;

    public Secretaria toDTO(Consultorio consultorio, Usuario usuario) {
        return Secretaria.builder().user(usuario).address(this.address).isMain(false).clinic(consultorio).build();
    }
}
