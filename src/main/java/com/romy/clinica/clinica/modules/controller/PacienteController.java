package com.romy.clinica.clinica.modules.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.romy.clinica.clinica.dto.paciente.PacienteDTORequest;

import com.romy.clinica.clinica.modules.services.paciente.PacienteCreateService;
import com.romy.clinica.clinica.modules.services.paciente.PacienteFindByNameService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/paciente")
public class PacienteController {
    private final PacienteCreateService pacienteCreateService;
    private final PacienteFindByNameService pacienteFindByNameService;

    public PacienteController(PacienteCreateService pacienteCreateService, PacienteFindByNameService pacienteFindByNameService) {
        this.pacienteCreateService = pacienteCreateService;
        this.pacienteFindByNameService = pacienteFindByNameService;
    }

    @PostMapping("")
    public ResponseEntity<Object> createPaciente(@Valid @RequestBody PacienteDTORequest pacienteDTORequest) {
        try {
            var pacienteDTOResponse = this.pacienteCreateService.execute(pacienteDTORequest);
            return ResponseEntity.ok().body(pacienteDTOResponse);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/find")
    public ResponseEntity<Object> findPaciente(@RequestParam String nome) {
        try{
            var pacienteDTOResponses = this.pacienteFindByNameService.execute(nome);
            return ResponseEntity.ok().body(pacienteDTOResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
