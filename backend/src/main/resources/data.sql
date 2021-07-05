INSERT INTO consultorio(nome, endereco, is_active) VALUES ('A', 'Rua Fulano de Tal', true);
INSERT INTO consultorio(nome, endereco, is_active) VALUES ('B', 'Rua ABC', true);

INSERT INTO secretaria(nome, cpf, is_main, consultorio_id) VALUES ('Ana', '072.087.550-19', true, 1);
INSERT INTO secretaria(nome, cpf, is_main, consultorio_id) VALUES ('Maria', '556.745.840-10', false, 2);