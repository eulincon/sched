package br.com.lincon.sched.controllers;

import br.com.lincon.sched.dtos.SecretariaRequest;
import br.com.lincon.sched.dtos.SecretariaResponse;
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
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/secretarias")
public class SecretariaController {

    @Autowired
    SecretariaRepository secretariaRepository;
    @Autowired
    ConsultorioRepository consultorioRepository;
    ModelMapper modelMapper = new ModelMapper();

    @GetMapping
    public ResponseEntity<List<SecretariaResponse>> findAll(){
        List<Secretaria> all = secretariaRepository.findAll();
        List<SecretariaResponse> secretariasResponse = all.stream().map(secretaria -> modelMapper.map(secretaria, SecretariaResponse.class)).collect(Collectors.toList());
        return ResponseEntity.ok(secretariasResponse);
    }

    @PostMapping
    public ResponseEntity<Secretaria> criar(@RequestBody @Valid SecretariaRequest secretariaRequest){
        Consultorio consultorio = consultorioRepository.findById(secretariaRequest.getClinicId()).orElseThrow(() -> new NegocioException("Consultorio com id {"+secretariaRequest.getClinicId()+"} não encontrado",HttpStatus.UNPROCESSABLE_ENTITY));
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
        if(secretaria.isMain() != secretariaToUpdate.isMain()){
            secretariaToUpdate.setMain(secretaria.isMain());
            Optional<Secretaria> secretariaMain = secretariaRepository.findByIsMain(true);
            if(!secretariaMain.isEmpty()) {
                secretariaMain.get().setMain(false);
                secretariaRepository.save(secretariaMain.get());
            }
        }
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
        Secretaria secretariaMainAnterior = secretariaRepository.findByIsMain(true).get();
        secretariaMainAnterior.setMain(false);
        Secretaria secretariaMainAtual = secretariaRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        secretariaMainAtual.setMain(true);
        secretariaRepository.save(secretariaMainAnterior);
        secretariaRepository.save(secretariaMainAtual);
        return ResponseEntity.ok().build();
    }
}
