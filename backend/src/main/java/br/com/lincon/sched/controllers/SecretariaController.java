package br.com.lincon.sched.controllers;

import br.com.lincon.sched.entities.Secretaria;
import br.com.lincon.sched.repositories.SecretariaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/secretarias")
public class SecretariaController {

    @Autowired
    SecretariaRepository secretariaRepository;

    @GetMapping
    public ResponseEntity<List<Secretaria>> findAll(){
        List<Secretaria> all = secretariaRepository.findAll();
        return ResponseEntity.ok(all);
    }

    @PostMapping
    public ResponseEntity<Secretaria> criar(@RequestBody @Valid Secretaria secretaria){
        Secretaria secretaria1 = secretariaRepository.save(secretaria);
        return ResponseEntity.ok(secretaria1);
    }
}
