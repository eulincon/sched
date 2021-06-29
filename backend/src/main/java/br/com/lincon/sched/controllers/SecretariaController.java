package br.com.lincon.sched.controllers;

import br.com.lincon.sched.dtos.SecretariaRequest;
import br.com.lincon.sched.entities.Consultorio;
import br.com.lincon.sched.entities.Secretaria;
import br.com.lincon.sched.exceptionhandlers.NegocioException;
import br.com.lincon.sched.repositories.ConsultorioRepository;
import br.com.lincon.sched.repositories.SecretariaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/secretarias")
public class SecretariaController {

    @Autowired
    SecretariaRepository secretariaRepository;
    @Autowired
    ConsultorioRepository consultorioRepository;

    @GetMapping
    public ResponseEntity<List<Secretaria>> findAll(){
        List<Secretaria> all = secretariaRepository.findAll();
        return ResponseEntity.ok(all);
    }

    @PostMapping
    public ResponseEntity<Secretaria> criar(@RequestBody @Valid SecretariaRequest secretariaRequest){
        Consultorio consultorio = consultorioRepository.findById(secretariaRequest.getConsultorioId()).orElseThrow(() -> new NegocioException("Consultorio com id {"+secretariaRequest.getConsultorioId()+"} não encontrado",HttpStatus.UNPROCESSABLE_ENTITY));
        Secretaria secretaria = secretariaRequest.toDTO(consultorio);
        secretariaRepository.save(secretaria);
        return ResponseEntity.ok(secretaria);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateSecretaria(@PathVariable Long id, @RequestBody SecretariaRequest secretaria) {
        Secretaria secretariaToUpdate = secretariaRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        secretariaToUpdate.setNome(secretaria.getNome());
        secretariaToUpdate.setCpf(secretaria.getCpf());
        secretariaRepository.save(secretariaToUpdate);
        return ResponseEntity.ok().build();
    }
}
