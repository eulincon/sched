package br.com.lincon.sched.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentLog {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne
  @JsonIgnore
  private Appointment appointment;
  @Enumerated(EnumType.STRING)
  private AppointmentStatus appointmentStatus;
  private Instant timestamp;
}
