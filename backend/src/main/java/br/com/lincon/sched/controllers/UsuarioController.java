package br.com.lincon.sched.controllers;

import br.com.lincon.sched.dtos.UsuarioRequest;
import br.com.lincon.sched.entities.UserType;
import br.com.lincon.sched.entities.Usuario;
import br.com.lincon.sched.exceptionhandlers.NegocioException;
import br.com.lincon.sched.repositories.UsuarioRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UsuarioController {

  @Autowired
  UsuarioRepository usuarioRepository;
  ModelMapper modelMapper = new ModelMapper();

  @PostMapping
  public ResponseEntity criarUsuario(@Valid @RequestBody UsuarioRequest usuarioRequest) {
    if (usuarioRepository.findByCpf(usuarioRequest.getCpf()).isPresent()) {
      throw new NegocioException("Usuário já cadastrado", HttpStatus.BAD_REQUEST);
    }

    Usuario usuario = usuarioRequest.toModel();

//    Usuario usuario = modelMapper.map(usuarioRequest, Usuario.class);
//    usuario.setType(UserType.PATIENT);
//    usuario.setPassword(new BCryptPasswordEncoder().encode(usuario.getPassword()));
    usuarioRepository.save(usuario);

    return ResponseEntity.status(200).build();

  }
}
