package br.com.lincon.sched.dtos;

import br.com.lincon.sched.entities.Usuario;
import lombok.Data;

@Data
public class SecretariaResponse {
    private Long id;
    private Usuario user;
    private String address;
    private boolean isMain;
    private Long clinicId;
}
