package br.com.lincon.sched.dtos;

import br.com.lincon.sched.entities.Appointment;
import br.com.lincon.sched.entities.Consultorio;
import br.com.lincon.sched.entities.UserType;
import br.com.lincon.sched.entities.Usuario;
import br.com.lincon.sched.exceptionhandlers.NegocioException;
import br.com.lincon.sched.repositories.AppointmentRepository;
import br.com.lincon.sched.repositories.ConsultorioRepository;
import br.com.lincon.sched.repositories.UsuarioRepository;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Optional;

@Data
public class AppointmentRequest {
  private String details;
  @NotNull
  private Long clinicId;
  @NotNull
  @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
  private LocalDateTime time;
  @Email
  @NotBlank
  private String userEmail;
  @CPF
  @NotBlank
  private String userCpf;
  @NotBlank
  private String userName;

  public Appointment toModel(AppointmentRepository appointmentRepository, ConsultorioRepository consultorioRepository, UsuarioRepository usuarioRepository) {
    Consultorio clinic = consultorioRepository.findById(this.clinicId).orElseThrow(() -> new NegocioException("Consultório não encontrado"));
    Optional<Usuario> usuario = usuarioRepository.findByCpf(this.userCpf);

    Usuario usuario1;

    if (usuario.isPresent()) {
      usuario1 = usuario.get();
    } else {
      Usuario userToSave = Usuario.builder().email(this.userEmail).cpf(this.userCpf).name(this.userName).type(UserType.PATIENT).build();
      Usuario user = usuarioRepository.save(userToSave);
      usuario1 = userToSave;
    }

    return Appointment.builder().clinic(clinic).user(usuario1).details(this.details).time(this.time).build();
  }
}
