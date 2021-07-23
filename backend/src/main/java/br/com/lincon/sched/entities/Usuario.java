package br.com.lincon.sched.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.validator.constraints.br.CPF;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotBlank
  private String name;
  @Email
  @NotBlank
  @Column(unique = true)
  private String email;
  private String password;
  @CPF
  private String cpf;
  @Enumerated(EnumType.STRING)
  private UserType type;
  @OneToMany(mappedBy = "user")
  @JsonIgnore
  private List<Appointment> appointments;
}
