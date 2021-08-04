package br.com.lincon.sched.repositories;

import br.com.lincon.sched.entities.Appointment;
import br.com.lincon.sched.entities.AppointmentStatus;
import br.com.lincon.sched.entities.Usuario;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
  List<Appointment> findByUser(Usuario user);

  List<Appointment> findByAppointmentLogAppointmentStatus(AppointmentStatus status);
}
