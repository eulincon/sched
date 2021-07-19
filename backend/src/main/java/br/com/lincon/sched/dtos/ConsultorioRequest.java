package br.com.lincon.sched.dtos;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ConsultorioRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String address;
}
