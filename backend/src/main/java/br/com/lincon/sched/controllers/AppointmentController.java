package br.com.lincon.sched.controllers;

import br.com.lincon.sched.entities.Appointment;
import br.com.lincon.sched.entities.AppointmentLog;
import br.com.lincon.sched.entities.AppointmentStatus;
import br.com.lincon.sched.entities.Secretaria;
import br.com.lincon.sched.exceptionhandlers.NegocioException;
import br.com.lincon.sched.repositories.*;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

  Logger LOGGER = LoggerFactory.getLogger(AppointmentController.class);
  @Autowired
  ConsultorioRepository consultorioRepository;
  @Autowired
  UsuarioRepository usuarioRepository;
  @Autowired
  SecretariaRepository secretariaRepository;
  @Autowired
  AppointmentRepository appointmentRepository;
  @Autowired
  AppointmentLogRepository appointmentLogRepository;

  @PutMapping("/{id}")
  public ResponseEntity updateStatus(@PathVariable Long id, @RequestParam AppointmentStatus status, @Valid @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME, pattern = "yyyy-MM-dd HH:mm") LocalDateTime newDate) {
    Appointment appointment = appointmentRepository.findById(id).orElseThrow(() -> new NegocioException("Consulta não encontrada"));

    if (status.equals("REAGENDANDO")) {
      if (newDate == null)
        throw new NegocioException("Data de remarcação necessária quando status REAGENDANDO");
      appointment.setRescheduledDate(newDate);
      appointmentRepository.save(appointment);
    }

    AppointmentLog appointmentLog = AppointmentLog.builder().appointment(appointment).timestamp(Instant.now()).appointmentStatus(status).build();

    appointmentLogRepository.save(appointmentLog);

    return ResponseEntity.ok().build();
  }

  @GetMapping("/clinic/{id}")
  public ResponseEntity<List<Appointment>> findAllByConsultorioId(@PathVariable Long clinicId) {
    List<Appointment> appointmentsByClinic = appointmentRepository.findByClinicId(clinicId);

    return ResponseEntity.ok(appointmentsByClinic);
  }

  @GetMapping("/secretary/{id}")
  public ResponseEntity<List<Appointment>> findAllBySecretaryResponsible(@PathVariable Long id) {
    Secretaria secretaria = secretariaRepository.findById(id).orElseThrow(() -> new NegocioException("Secretária não encontrada", HttpStatus.UNPROCESSABLE_ENTITY));
    List<Appointment> appointments = appointmentRepository.findByClinicId(secretaria.getClinic().getId());

    return ResponseEntity.ok(appointments);
  }

  @GetMapping
  public ResponseEntity<List<Appointment>> findAllAppointments() {
    List<Appointment> all = appointmentRepository.findAll();

    return ResponseEntity.ok(all);
  }

  @GetMapping("/filter")
  public ResponseEntity<List<Appointment>> findAllAppointmentByStatus(@RequestParam AppointmentStatus status, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME, pattern = "yyyy-MM-dd") LocalDate date) {
    if (date == null) {
      List<Appointment> appointmentsConfirmados = appointmentRepository.findByAppointmentLogAppointmentStatus(status);
      return ResponseEntity.ok(appointmentsConfirmados);
    } else {
      List<Appointment> appointmentsConfirmadosByDate = appointmentRepository.findByAppointmentLogAppointmentStatusAndTimeBetween(status, date.atStartOfDay(), date.atTime(23, 59, 59));
      List<Appointment> appointmentsConfirmadosByRescheduledDate = appointmentRepository.findByAppointmentLogAppointmentStatusAndRescheduledDateBetween(status, date.atStartOfDay(), date.atTime(23, 59, 59));
      appointmentsConfirmadosByDate.addAll(appointmentsConfirmadosByRescheduledDate);
      return ResponseEntity.ok(appointmentsConfirmadosByDate);
    }
  }
}
