INSERT INTO consultorio(nome, endereco, is_active) VALUES ('A', 'Rua Fulano de Tal', true);
INSERT INTO consultorio(nome, endereco, is_active) VALUES ('B', 'Rua ABC', true);

INSERT INTO secretaria(nome, cpf, is_main, consultorio_id) VALUES ('Ana', '111.222.333-44', true, 1);
INSERT INTO secretaria(nome, cpf, is_main, consultorio_id) VALUES ('Maria', '000.222.333-00', false, 2);