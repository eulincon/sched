package br.com.lincon.sched.controllers;

import br.com.lincon.sched.entities.Consultorio;
import br.com.lincon.sched.repositories.ConsultorioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultorios")
public class ConsultorioController {

    @Autowired
    ConsultorioRepository consultorioRepository;

    @GetMapping
    public ResponseEntity<List<Consultorio>> findAll() {
        List<Consultorio> consultorios = consultorioRepository.findAll();
        return ResponseEntity.ok(consultorios);
    }

    @PostMapping
    public ResponseEntity<Consultorio> save(@RequestBody Consultorio consultorio) {
        consultorio.setActive(true);
        Consultorio consultorio1 = consultorioRepository.save(consultorio);
        return ResponseEntity.ok(consultorio1);
    }

}
