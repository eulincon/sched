package br.com.lincon.sched.controllers;

import br.com.lincon.sched.dtos.AppointmentRequest;
import br.com.lincon.sched.entities.Appointment;
import br.com.lincon.sched.entities.Consultorio;
import br.com.lincon.sched.entities.UserType;
import br.com.lincon.sched.entities.Usuario;
import br.com.lincon.sched.exceptionhandlers.NegocioException;
import br.com.lincon.sched.repositories.AppointmentRepository;
import br.com.lincon.sched.repositories.ConsultorioRepository;
import br.com.lincon.sched.repositories.UsuarioRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

  Logger LOGGER = LoggerFactory.getLogger(AppointmentController.class);
  ModelMapper modelMapper = new ModelMapper();
  @Autowired
  ConsultorioRepository consultorioRepository;
  @Autowired
  UsuarioRepository usuarioRepository;
  @Autowired
  AppointmentRepository appointmentRepository;

  @PostMapping
  public ResponseEntity<Appointment> create(@Valid @RequestBody AppointmentRequest appointmentRequest) {

    Appointment appointment = appointmentRequest.toModel(appointmentRepository, consultorioRepository, usuarioRepository);

    appointmentRepository.save(appointment);

    return ResponseEntity.ok(appointment);
  }
}
