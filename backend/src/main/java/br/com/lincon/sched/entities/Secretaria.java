package br.com.lincon.sched.entities;

import br.com.lincon.sched.dtos.SecretariaResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Secretaria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    @OneToOne
    private Usuario user;
    private boolean isMain;
    @NotBlank
    private String address;
    @OneToOne
    @JsonIgnore
    private Consultorio clinic;

    public SecretariaResponse toDto() {
        return SecretariaResponse.builder().id(this.id).clinicId(this.clinic.getId()).isMain(this.isMain).address(this.address).build();
    }
}
