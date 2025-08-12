package com.romy.clinica.clinica.modules.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.romy.clinica.clinica.dto.dentista.DentistaDTORequest;
import com.romy.clinica.clinica.dto.dentista.DentistaUpdateDTORequest;
import com.romy.clinica.clinica.modules.services.dentista.DentistaCreateService;
import com.romy.clinica.clinica.modules.services.dentista.DentistaDeleteService;
import com.romy.clinica.clinica.modules.services.dentista.DentistaFindByIdService;
import com.romy.clinica.clinica.modules.services.dentista.DentistaListService;
import com.romy.clinica.clinica.modules.services.dentista.DentistaUpdateService;
import com.romy.clinica.clinica.modules.services.dentista.DentitaDesactivateOrActivateService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/dentista")
public class DentistaController {
    @Autowired
    private DentistaCreateService dentistaCreateService;

    @Autowired
    private DentistaFindByIdService dentistaFindByIdService;

    @Autowired
    private DentistaListService dentistaListService;

    @Autowired
    private DentistaUpdateService dentistaUpdateService;

    @Autowired
    private DentitaDesactivateOrActivateService dentistaDesactivateOrActivateService;

    @Autowired
    private DentistaDeleteService dentistaDeleteService;

    @PostMapping()
    public ResponseEntity<Object> dentistaCreate(@Valid @RequestBody DentistaDTORequest dentistaDTORequest){
        try {
            var dentistaDTOResponse = this.dentistaCreateService.execute(dentistaDTORequest);
            return ResponseEntity.ok().body(dentistaDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/find")
    public ResponseEntity<Object> dentistaFind(){
        try {
            var dentistaDTOResponses = this.dentistaListService.execute();
            return ResponseEntity.ok().body(dentistaDTOResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> dentistaFindById(@PathVariable String id){
        try {
            var dentistaDTOResponse = this.dentistaFindByIdService.execute(id);
            return ResponseEntity.ok().body(dentistaDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> dentistaUpdate(@Valid @RequestBody DentistaUpdateDTORequest dentistaUpdateDTORequest, @PathVariable String id){
        try {
            var dentistaDTOResponse = this.dentistaUpdateService.execute(dentistaUpdateDTORequest, id);
            return ResponseEntity.ok().body(dentistaDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> dentistaDelete(@PathVariable String id){
        try {
            var dentistaDTOResponse = this.dentistaDeleteService.execute(id);
            return ResponseEntity.ok().body(dentistaDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/alterar-status/{id}")
    public ResponseEntity<Object> dentistaAlterarStatus(@PathVariable String id){
        try {
            var dentistaDTOResponse = this.dentistaDesactivateOrActivateService.execute(id);
            return ResponseEntity.ok().body(dentistaDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
