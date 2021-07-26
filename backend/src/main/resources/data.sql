INSERT INTO consultorio(name, address, is_active) VALUES ('Consultório A', 'Rua Fulano de Tal', true);
INSERT INTO consultorio(name, address, is_active) VALUES ('Consultório B', 'Rua ABC', true);

INSERT INTO secretaria(name, cpf, address, is_main, clinic_id) VALUES ('Ana', '072.087.550-19', 'Rua X', true, 1);
INSERT INTO secretaria(name, cpf, address, is_main, clinic_id) VALUES ('Maria', '556.745.840-10', 'Rua Y', false, 2);

INSERT INTO usuario(cpf, email, name, password, type) VALUES ('04309089380', 'a@a.com', 'Lincon', '$2a$10$pXPrMAlBwA/Y8q496HP6d.S2FkYTuafMjEn8ffw6zSkmFlyBp5VG6', 'PATIENT')