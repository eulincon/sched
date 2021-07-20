package br.com.lincon.sched.dtos;

import lombok.Data;

@Data
public class SecretariaResponse {
    private Long id;
    private String name;
    private String cpf;
    private String address;
    private boolean isMain;
    private Long clinicId;
}
