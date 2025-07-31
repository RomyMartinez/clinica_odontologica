package com.romy.clinica.clinica.modules.services.paciente;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.paciente.PacienteDTOResponse;
import com.romy.clinica.clinica.modules.models.entities.PacienteEntity;
import com.romy.clinica.clinica.modules.models.repositories.PacienteRepository;

@Service
public class PacienteFindByNameService {
    @Autowired
    private PacienteRepository pacienteRepository;

    public List<PacienteDTOResponse> execute(String nome){
        var pacientes = findInDB(nome);
        var pacientesDTOResponses = formatResponse(pacientes);
        return pacientesDTOResponses;
        
    }

    private List<PacienteEntity> findInDB(String nome){
        return this.pacienteRepository.findByNomeContainingIgnoreCase(nome);
    }

    private List<PacienteDTOResponse> formatResponse(List<PacienteEntity> pacientes){
        var pacienteDTOResponses = pacientes.stream()
                .map(pacienteEntity -> PacienteDTOResponse.builder()
                        .nome(pacienteEntity.getNome())
                        .email(pacienteEntity.getEmail())
                        .telefone(pacienteEntity.getTelefone())
                        .build())
                .toList();

        return pacienteDTOResponses;
    }
}
