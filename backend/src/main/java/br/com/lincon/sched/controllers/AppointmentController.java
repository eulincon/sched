package br.com.lincon.sched.controllers;

import br.com.lincon.sched.dtos.AppointmentRequest;
import br.com.lincon.sched.entities.*;
import br.com.lincon.sched.exceptionhandlers.NegocioException;
import br.com.lincon.sched.repositories.AppointmentLogRepository;
import br.com.lincon.sched.repositories.AppointmentRepository;
import br.com.lincon.sched.repositories.ConsultorioRepository;
import br.com.lincon.sched.repositories.UsuarioRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.time.Instant;
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
  @Autowired
  AppointmentLogRepository appointmentLogRepository;

  @PutMapping("/{id}")
  public ResponseEntity updateStatus(@PathVariable Long id,@RequestParam String status) {
    Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new NegocioException("Consulta não encontrada"));

    AppointmentLog appointmentLog = AppointmentLog.builder().appointment(appointment).timestamp(Instant.now()).appointmentStatus(AppointmentStatus.valueOf(status)).build();

    appointmentLogRepository.save(appointmentLog);

    return ResponseEntity.ok().build();
  }

//  @PostMapping
//  public ResponseEntity<Appointment> create(@Valid @RequestBody AppointmentRequest appointmentRequest) {
//
//    Appointment appointment = appointmentRequest.toModel(appointmentRepository, consultorioRepository, usuarioRepository);
//
//    appointmentRepository.save(appointment);
//
//    return ResponseEntity.ok(appointment);
//  }
}
