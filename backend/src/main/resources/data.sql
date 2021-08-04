INSERT INTO consultorio(name, address, is_active) VALUES ('Consultório A', 'Rua Fulano de Tal', true);
INSERT INTO consultorio(name, address, is_active) VALUES ('Consultório B', 'Rua ABC', true);

INSERT INTO usuario(cpf, email, name, password, type) VALUES ('04309089380', 'u@a.com', 'Lincon', '$2a$10$pXPrMAlBwA/Y8q496HP6d.S2FkYTuafMjEn8ffw6zSkmFlyBp5VG6', 'PATIENT');
INSERT INTO usuario(cpf, email, name, password, type) VALUES ('04309089380', 's1@a.com', 'Luiza', '$2a$10$pXPrMAlBwA/Y8q496HP6d.S2FkYTuafMjEn8ffw6zSkmFlyBp5VG6', 'SECRETARY');
INSERT INTO usuario(cpf, email, name, password, type) VALUES ('04309089380', 's2@a.com', 'Milena', '$2a$10$pXPrMAlBwA/Y8q496HP6d.S2FkYTuafMjEn8ffw6zSkmFlyBp5VG6', 'SECRETARY');

INSERT INTO secretaria(address, is_main, clinic_id, user_id) VALUES ('Rua X', true, 1, 2);
INSERT INTO secretaria(address, is_main, clinic_id, user_id) VALUES ('Rua Y', false, 2, 3);

INSERT INTO appointment(time, clinic_id, user_id) VALUES ({ts '2021-08-07 13:00'}, 1, 1);
INSERT INTO appointment(time, clinic_id, user_id) VALUES ({ts '2021-08-07 13:00'}, 1, 1);
INSERT INTO appointment(time, clinic_id, user_id) VALUES ({ts '2021-08-03 13:00'}, 1, 1);
INSERT INTO appointment(time, rescheduled_date, clinic_id, user_id) VALUES ({ts '2021-08-03 13:00'}, {ts '2021-08-07 17:00'}, 1, 1);
INSERT INTO appointment(time, clinic_id, user_id) VALUES ({ts '2021-08-03 13:00'}, 1, 1);


INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('PENDENTE', current_time(), 1);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('PENDENTE', current_time(), 2);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('PENDENTE', current_time(), 3);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('PENDENTE', current_time(), 4);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('PENDENTE', current_time(), 5);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('CONFIRMADO', current_time(), 1);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('RECUSADO', current_time(), 2);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('CANCELADO', current_time(), 3);
INSERT INTO appointment_log(appointment_status, timestamp, appointment_id) VALUES ('REAGENDANDO', current_time(), 4);