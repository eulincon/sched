package br.com.lincon.sched.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class InitController {

    @GetMapping
    public String get(){
        return "ok";
    }
}
