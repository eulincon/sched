package br.com.lincon.sched.dtos;

import br.com.lincon.sched.entities.Consultorio;
import br.com.lincon.sched.entities.Secretaria;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

@Data
public class SecretariaRequest {
    private String nome;
    @CPF
    private String cpf;
    private boolean isMain;
    private Long consultorioId;

    public Secretaria toDTO(Consultorio consultorio) {
        return Secretaria.builder().cpf(this.cpf).nome(this.nome).isMain(this.isMain).consultorio(consultorio).build();
    }
}
