package br.com.lincon.sched.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Consultorio {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @NotBlank
  private String name;
  @NotBlank
  private String address;
  @OneToMany(mappedBy = "clinic")
  @JsonIgnore
  private List<Appointment> appointments;
  private boolean isActive;
}
