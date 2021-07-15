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

import javax.transaction.Transactional;
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
    public ResponseEntity updateSecretaria(@PathVariable Long id, @RequestBody @Valid SecretariaRequest secretaria) {
        Secretaria secretariaToUpdate = secretariaRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        secretariaToUpdate.setName(secretaria.getName());
        secretariaToUpdate.setCpf(secretaria.getCpf());
        secretariaToUpdate.setAddress(secretaria.getAddress());
        secretariaToUpdate.setMain(secretaria.isMain());
        secretariaRepository.save(secretariaToUpdate);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteSecretaria(@PathVariable Long id) {
        Secretaria secretariaToDelete = secretariaRepository.findById(id).orElseThrow(() -> new NegocioException("Secretária não encontrada", HttpStatus.NOT_FOUND));
        secretariaRepository.delete(secretariaToDelete);
        return ResponseEntity.ok().build();
    }

    @Transactional
    @PutMapping("{id}/updateMain")
    public ResponseEntity updateMainSecretaria(@PathVariable Long id) {
        Secretaria secretariaMainAnterior = secretariaRepository.findByIsMain(true);
        secretariaMainAnterior.setMain(false);
        Secretaria secretariaMainAtual = secretariaRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        secretariaMainAtual.setMain(true);
        secretariaRepository.save(secretariaMainAnterior);
        secretariaRepository.save(secretariaMainAtual);
        return ResponseEntity.ok().build();
    }
}
