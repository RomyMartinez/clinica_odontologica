package com.romy.clinica.clinica.modules.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.romy.clinica.clinica.dto.consulta.ConsultaDTORequest;
import com.romy.clinica.clinica.dto.consulta.ConsultaUpdateDTORequest;
import com.romy.clinica.clinica.modules.services.consulta.ConsultaAgendarService;
import com.romy.clinica.clinica.modules.services.consulta.ConsultaBuscarPorIdDentistaService;
import com.romy.clinica.clinica.modules.services.consulta.ConsultaConcluidaService;
import com.romy.clinica.clinica.modules.services.consulta.ConsultaDesativarService;
import com.romy.clinica.clinica.modules.services.consulta.ConsultaUpdateService;
import com.romy.clinica.clinica.modules.services.consulta.ConsultarBuscarPorIdService;
import com.romy.clinica.clinica.modules.services.consulta.ConsultarListarService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/consulta")
public class ConsultaController {
    @Autowired
    private ConsultaAgendarService consultaAgendarService;

    @Autowired
    private ConsultaBuscarPorIdDentistaService consultaBuscarPorIdDentistaService;

    @Autowired
    private ConsultaConcluidaService consultaConcluidaService;

    @Autowired
    private ConsultaDesativarService consultaDesativarService;

    @Autowired
    private ConsultarListarService consultarListarService;

    @Autowired
    private ConsultaUpdateService consultaUpdateService;

    @Autowired
    private ConsultarBuscarPorIdService consultarBuscarPorIdService;
    
    @PostMapping("/agendar")
    public ResponseEntity<Object> consultaAgendar(@Valid @RequestBody ConsultaDTORequest consultaDTORequest){
        try {
            var consultaAgendarDTOResponse = this.consultaAgendarService.execute(consultaDTORequest);
            return ResponseEntity.ok().body(consultaAgendarDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/find")
    public ResponseEntity<Object> consultarFind(@RequestParam String dentistaId){
        try {
            var consultasDTOResponses = this.consultarListarService.execute();
            return ResponseEntity.ok().body(consultasDTOResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> consultarFindById(@RequestParam String id){
        try {
            var consultaDTOResponse = this.consultarBuscarPorIdService.execute(id);
            return ResponseEntity.ok().body(consultaDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/dentista/{id}")
    public ResponseEntity<Object> consultarFindByDentistaId(@RequestParam String id){
        try {
            var consultasDTOResponses = this.consultaBuscarPorIdDentistaService.execute(id);
            return ResponseEntity.ok().body(consultasDTOResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/desativar")
    public ResponseEntity<Object> consultaDesativar(@RequestParam String id){
        try {
            var consultaDTOResponse = this.consultaDesativarService.execute(id);
            return ResponseEntity.ok().body(consultaDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/cancelar")
    public ResponseEntity<Object> consultaCancelar(@RequestParam String id){
        try {
            var consultaDTOResponse = this.consultaConcluidaService.execute(id);
            return ResponseEntity.ok().body(consultaDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/update")
    public ResponseEntity<Object> consultaUpdate(@Valid @RequestBody ConsultaUpdateDTORequest consultaUpdateDTORequest, @RequestParam String id){
        try {
            var consultaDTOResponse = this.consultaUpdateService.execute(consultaUpdateDTORequest, id);
            return ResponseEntity.ok().body(consultaDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
