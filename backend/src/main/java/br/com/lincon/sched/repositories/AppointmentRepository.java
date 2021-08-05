package br.com.lincon.sched.repositories;

import br.com.lincon.sched.entities.Appointment;
import br.com.lincon.sched.entities.AppointmentStatus;
import br.com.lincon.sched.entities.Consultorio;
import br.com.lincon.sched.entities.Usuario;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
  List<Appointment> findByUser(Usuario user);

  List<Appointment> findByAppointmentLogAppointmentStatus(AppointmentStatus status);

  List<Appointment> findByAppointmentLogAppointmentStatusAndTimeBetween(AppointmentStatus status, LocalDateTime startDate, LocalDateTime endDate);

  List<Appointment> findByAppointmentLogAppointmentStatusAndRescheduledDateBetween(AppointmentStatus status, LocalDateTime startDate, LocalDateTime endDate);

  List<Appointment> findByClinicId(Long clinicId);
}
