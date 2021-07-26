package br.com.lincon.sched.repositories;

import br.com.lincon.sched.entities.AppointmentLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentLogRepository extends JpaRepository<AppointmentLog, Long> {
}
