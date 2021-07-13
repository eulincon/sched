package br.com.lincon.sched.dtos;

import br.com.lincon.sched.entities.Consultorio;
import br.com.lincon.sched.entities.Secretaria;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

@Data
public class SecretariaRequest {
    private String name;
    @CPF
    private String cpf;
    private String address;
    private boolean isMain;
    private Long consultorioId;

    public Secretaria toDTO(Consultorio consultorio) {
        return Secretaria.builder().cpf(this.cpf).name(this.name).address(this.address).isMain(false).clinic(consultorio).build();
    }
}
