INSERT INTO consultorio(name, address, is_active) VALUES ('Consultório A', 'Rua Fulano de Tal', true);
INSERT INTO consultorio(name, address, is_active) VALUES ('Consultório B', 'Rua ABC', true);

INSERT INTO secretaria(name, cpf, address, is_main, clinic_id) VALUES ('Ana', '072.087.550-19', 'Rua X', true, 1);
INSERT INTO secretaria(name, cpf, address, is_main, clinic_id) VALUES ('Maria', '556.745.840-10', 'Rua Y', false, 2);

INSERT INTO usuario(cpf, email, name, password, type) VALUES ('04309089380', 'a@a.com', 'Lincon', '$2a$10$pXPrMAlBwA/Y8q496HP6d.S2FkYTuafMjEn8ffw6zSkmFlyBp5VG6', 'PATIENT');

INSERT INTO appointment(time, clinic_id, user_id) VALUES ({ts '2021-04-03 13:00'}, 1, 1);
INSERT INTO appointment(time, clinic_id, user_id) VALUES ({ts '2021-04-03 13:00'}, 1, 1);
INSERT INTO appointment(time, clinic_id, user_id) VALUES ({ts '2021-04-03 13:00'}, 1, 1);
INSERT INTO appointment(time, rescheduled_date, clinic_id, user_id) VALUES ({ts '2021-04-03 13:00'}, {ts '2021-04-07 17:00'}, 1, 1);
INSERT INTO appointment(time, clinic_id, user_id) VALUES ({ts '2021-04-03 13:00'}, 1, 1);


INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('PENDENTE', current_time(), 1);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('PENDENTE', current_time(), 2);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('PENDENTE', current_time(), 3);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('PENDENTE', current_time(), 4);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('PENDENTE', current_time(), 5);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('CONFIRMADO', current_time(), 1);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('RECUSADO', current_time(), 2);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('CANCELADO', current_time(), 3);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('REAGENDANDO', current_time(), 4);