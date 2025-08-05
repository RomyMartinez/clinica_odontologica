package com.romy.clinica.clinica.modules.services.paciente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.paciente.PacienteDTOResponse;
import com.romy.clinica.clinica.errors.error_types.PacienteNotFoundException;
import com.romy.clinica.clinica.modules.models.entities.PacienteEntity;
import com.romy.clinica.clinica.modules.models.repositories.PacienteRepository;

@Service
public class PacienteFindByCpfService {
    @Autowired
    private PacienteRepository pacienteRepository;

    public PacienteDTOResponse execute(String cpf){
        var paciente = findInDB(cpf);
        var pacienteDTOResponse = formatResponse(paciente);
        return pacienteDTOResponse;
        
    }

    private PacienteEntity findInDB(String cpf){
        if(this.pacienteRepository.findByCpf(cpf).isEmpty()){
            throw new PacienteNotFoundException();
        }

        return this.pacienteRepository.findByCpf(cpf).get();
    }

    private PacienteDTOResponse formatResponse(PacienteEntity paciente){
        var pacienteDTOResponse = PacienteDTOResponse.builder()
                .id(paciente.getId())
                .cpf(paciente.getCpf())
                .nome(paciente.getNome())
                .email(paciente.getEmail())
                .telefone(paciente.getTelefone())
                .build();

        return pacienteDTOResponse;
    }
}
