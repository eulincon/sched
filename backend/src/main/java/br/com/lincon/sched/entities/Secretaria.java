package br.com.lincon.sched.entities;

import lombok.*;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Secretaria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank
    private String nome;
    @CPF
    private String cpf;
    private boolean isMain;
    @OneToOne
    private Consultorio consultorio;
}
