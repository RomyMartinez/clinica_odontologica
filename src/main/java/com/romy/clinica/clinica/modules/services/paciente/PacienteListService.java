package com.romy.clinica.clinica.modules.services.paciente;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.modules.models.entities.PacienteEntity;
import com.romy.clinica.clinica.modules.models.repositories.PacienteRepository;

@Service
public class PacienteListService {
    @Autowired
    private PacienteRepository pacienteRepository;

    public List<PacienteEntity> execute(){
        return pacienteRepository.findAll();
    }
}
