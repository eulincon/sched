package br.com.lincon.sched.controllers;

import br.com.lincon.sched.dtos.AppointmentRequest;
import br.com.lincon.sched.dtos.CreateUserRequest;
import br.com.lincon.sched.dtos.LoginUserRequest;
import br.com.lincon.sched.dtos.LoginUserResponse;
import br.com.lincon.sched.entities.*;
import br.com.lincon.sched.exceptionhandlers.NegocioException;
import br.com.lincon.sched.repositories.AppointmentLogRepository;
import br.com.lincon.sched.repositories.AppointmentRepository;
import br.com.lincon.sched.repositories.ConsultorioRepository;
import br.com.lincon.sched.repositories.UsuarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URL;
import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UsuarioController {

  @Autowired
  UsuarioRepository usuarioRepository;
  @Autowired
  AppointmentRepository appointmentRepository;
  @Autowired
  ConsultorioRepository consultorioRepository;
  @Autowired
  AppointmentLogRepository appointmentLogRepository;
  Logger LOGGER = LoggerFactory.getLogger(UsuarioController.class);

  @PostMapping
  public ResponseEntity criarUsuario(@Valid @RequestBody CreateUserRequest usuarioRequest) {
    if (usuarioRepository.findByCpf(usuarioRequest.getCpf()).isPresent()) {
      throw new NegocioException("Usuário já cadastrado", HttpStatus.BAD_REQUEST);
    }

    Usuario usuario = usuarioRequest.toModel();

//    Usuario usuario = modelMapper.map(usuarioRequest, Usuario.class);
//    usuario.setType(UserType.PATIENT);
//    usuario.setPassword(new BCryptPasswordEncoder().encode(usuario.getPassword()));
    usuarioRepository.save(usuario);

    return ResponseEntity.status(200).build();
  }

  @PostMapping("/login")
  public ResponseEntity<LoginUserResponse> login(@RequestBody LoginUserRequest loginUserRequest) {

    Usuario usuario = usuarioRepository.findByEmail(loginUserRequest.getEmail()).orElseThrow(() -> new NegocioException("Email ou senha inválidos", HttpStatus.UNPROCESSABLE_ENTITY));
    LOGGER.info("PasswordBD: " + usuario.getPassword());
    LOGGER.info("PasswordRequest: " + loginUserRequest.getPassword());

    if (!new BCryptPasswordEncoder().matches(loginUserRequest.getPassword(), usuario.getPassword())) {
      throw new NegocioException("Email ou senha inválidos", HttpStatus.UNPROCESSABLE_ENTITY);
    }

    LoginUserResponse loginUserResponse = LoginUserResponse.builder()
        .id(usuario.getId())
        .name(usuario.getName())
        .email(usuario.getEmail())
        .type(usuario.getType())
        .build();

    return ResponseEntity.ok(loginUserResponse);
  }

  @GetMapping("/{id}/appointments")
  public ResponseEntity<List<Appointment>> findAllAppointmentsByUser(@PathVariable Long id) {

    Usuario user = usuarioRepository.findById(id).orElseThrow(() -> new NegocioException("Usuário não encontrado", HttpStatus.UNPROCESSABLE_ENTITY));

    List<Appointment> appointments = appointmentRepository.findByUser(user);

    return ResponseEntity.ok(appointments);
  }

  @PostMapping("/{id}/appointments")
  public ResponseEntity<Appointment> createAppointment(@PathVariable Long id, @Valid @RequestBody AppointmentRequest appointmentRequest) {

    Usuario user = usuarioRepository.findById(id).orElseThrow(() -> new NegocioException("Usuário não encontrado", HttpStatus.UNPROCESSABLE_ENTITY));
    Consultorio clinic = consultorioRepository.findById(appointmentRequest.getClinicId()).orElseThrow(() -> new NegocioException("Consultório não encontrado", HttpStatus.UNPROCESSABLE_ENTITY));

    Appointment appointment = appointmentRequest.toModel(user, clinic);

    Appointment appointmentCreated = appointmentRepository.save(appointment);

    AppointmentLog appointmentLog = AppointmentLog.builder().appointment(appointmentCreated).appointmentStatus(AppointmentStatus.PENDENTE).timestamp(Instant.now()).build();

    appointmentLogRepository.save(appointmentLog);

    URI uri = UriComponentsBuilder.fromPath("/user/{id}/appointments/{AppoitmentId}").buildAndExpand(id, appointmentCreated.getId()).toUri();

    return ResponseEntity.created(uri).build();
  }
}
