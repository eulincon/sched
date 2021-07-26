package br.com.lincon.sched.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

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
  @OneToMany(mappedBy = "appointment")
  private List<AppointmentLog> appointmentLog;
}
