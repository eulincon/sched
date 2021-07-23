package br.com.lincon.sched.repositories;

import br.com.lincon.sched.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
