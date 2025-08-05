package com.romy.clinica.clinica.modules.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.romy.clinica.clinica.dto.paciente.PacienteDTORequest;
import com.romy.clinica.clinica.modules.services.paciente.PacienteCreateService;
import com.romy.clinica.clinica.modules.services.paciente.PacienteDeleteService;
import com.romy.clinica.clinica.modules.services.paciente.PacienteFindByCpfService;
import com.romy.clinica.clinica.modules.services.paciente.PacienteFindByNameService;
import com.romy.clinica.clinica.modules.services.paciente.PacienteListService;
import com.romy.clinica.clinica.modules.services.paciente.PacienteUpdateService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/paciente")
public class PacienteController {
    @Autowired
    private PacienteCreateService pacienteCreateService;

    @Autowired
    private PacienteFindByNameService pacienteFindByNameService;

    @Autowired
    private PacienteListService pacienteListService;

    @Autowired
    private PacienteFindByCpfService pacienteFindByCpfService;

    @Autowired
    private PacienteDeleteService pacienteDeleteService;

    @Autowired
    private PacienteUpdateService pacienteUpdateService;

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

    @GetMapping("/findAll")
    public ResponseEntity<Object> findAllPacientes() {
        try {
            var pacienteDTOResponses = this.pacienteListService.execute();
            return ResponseEntity.ok().body(pacienteDTOResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/findByName")
    public ResponseEntity<Object> findPaciente(@RequestParam String nome) {
        try{
            var pacienteDTOResponses = this.pacienteFindByNameService.execute(nome);
            return ResponseEntity.ok().body(pacienteDTOResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }


    @GetMapping("/findByCpf/{cpf}")
    public ResponseEntity<Object> findPacienteById(@RequestParam String cpf) {
        try {
            var pacienteDTOResponse = this.pacienteFindByCpfService.execute(cpf);
            return ResponseEntity.ok().body(pacienteDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/update")
    public ResponseEntity<Object> updatePaciente(@Valid @RequestBody PacienteDTORequest pacienteDTORequest, @RequestParam String id) {
        try {
            var pacienteDTOResponse = this.pacienteUpdateService.execute(pacienteDTORequest, id);
            return ResponseEntity.ok().body(pacienteDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deletePaciente(@RequestParam String cpf) {
        try {
            var pacienteDTOResponse = this.pacienteDeleteService.execute(cpf);
            return ResponseEntity.ok().body(pacienteDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
