package br.com.lincon.sched.controllers;

import br.com.lincon.sched.entities.Appointment;
import br.com.lincon.sched.entities.AppointmentLog;
import br.com.lincon.sched.entities.AppointmentStatus;
import br.com.lincon.sched.exceptionhandlers.NegocioException;
import br.com.lincon.sched.repositories.AppointmentLogRepository;
import br.com.lincon.sched.repositories.AppointmentRepository;
import br.com.lincon.sched.repositories.ConsultorioRepository;
import br.com.lincon.sched.repositories.UsuarioRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
import java.time.LocalDateTime;

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
  public ResponseEntity updateStatus(@PathVariable Long id, @RequestParam String status, @Valid @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME, pattern = "yyyy-MM-dd HH:mm") LocalDateTime newDate) {
    Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new NegocioException("Consulta não encontrada"));

    if (status.equals("REAGENDANDO")) {
      if (newDate == null)
        throw new NegocioException("Data de remarcação necessária quando status REAGENDANDO");
      appointment.setRescheduledDate(newDate);
      appointmentRepository.save(appointment);
    }

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
