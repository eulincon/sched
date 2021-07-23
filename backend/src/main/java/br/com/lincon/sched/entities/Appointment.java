package br.com.lincon.sched.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String details;
  @ManyToOne
  private Consultorio clinic;
  @ManyToOne
  private Usuario user;
  private LocalDateTime time;
}
