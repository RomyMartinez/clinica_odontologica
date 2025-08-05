package com.romy.clinica.clinica.modules.services.paciente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.paciente.PacienteDTORequest;
import com.romy.clinica.clinica.dto.paciente.PacienteDTOResponse;
import com.romy.clinica.clinica.errors.error_types.PacienteFoundException;
import com.romy.clinica.clinica.modules.models.entities.PacienteEntity;
import com.romy.clinica.clinica.modules.models.repositories.PacienteRepository;

@Service
public class PacienteCreateService{
    @Autowired
    private PacienteRepository pacienteRepository;

    public PacienteDTOResponse execute(PacienteDTORequest pacienteDTORequest) {
       validateIfPacienteAlreadyExists(pacienteDTORequest.getCpf());
       var pacienteSaved = insertPaciente(pacienteDTORequest);
       var pacienteDTOResponse = formattedResponse(pacienteSaved);

       return pacienteDTOResponse;
    }

    private void validateIfPacienteAlreadyExists(String cpf){
         this.pacienteRepository.findByCpf(cpf).ifPresent(
            paciente -> {
                throw new PacienteFoundException();
            }
        );
    
    }

    private PacienteEntity insertPaciente(PacienteDTORequest pacienteDTORequest){
        var pacienteEntity = PacienteEntity.builder()
                .cpf(pacienteDTORequest.getCpf())
                .nome(pacienteDTORequest.getNome())
                .telefone(pacienteDTORequest.getTelefone())
                .email(pacienteDTORequest.getEmail())
                .dataNascimento(pacienteDTORequest.getDataNascimento())
                .build();

        var pacienteSaved = this.pacienteRepository.save(pacienteEntity);

        return pacienteSaved;

    }

    private PacienteDTOResponse formattedResponse(PacienteEntity pacienteEntity){
        var pacienteDTOResponse = PacienteDTOResponse.builder()
                .id(pacienteEntity.getId())
                .cpf(pacienteEntity.getCpf())
                .nome(pacienteEntity.getNome())
                .email(pacienteEntity.getEmail())
                .telefone(pacienteEntity.getTelefone())
                .build();

        return pacienteDTOResponse;
    }
}
