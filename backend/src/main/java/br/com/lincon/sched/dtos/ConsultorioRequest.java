package br.com.lincon.sched.dtos;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class ConsultorioRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String address;
}
