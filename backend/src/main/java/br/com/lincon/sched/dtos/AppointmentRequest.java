package br.com.lincon.sched.dtos;

import br.com.lincon.sched.entities.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.Instant;
import java.time.LocalDateTime;

@Data
public class AppointmentRequest {
  private String details;
  @NotNull
  private Long clinicId;
  @NotNull
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime time;

  public Appointment toModel(Usuario user, Consultorio clinic) {
    return Appointment.builder().clinic(clinic).user(user).details(this.details).time(this.time).build();
  }
}
