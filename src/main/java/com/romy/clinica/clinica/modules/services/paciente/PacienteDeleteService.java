package com.romy.clinica.clinica.modules.services.paciente;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.htttpTypes.HttpDTOResponse;
import com.romy.clinica.clinica.errors.error_types.PacienteNotFoundException;
import com.romy.clinica.clinica.modules.models.repositories.PacienteRepository;

@Service
public class PacienteDeleteService {
    @Autowired
    private PacienteRepository pacienteRepository;

    public HttpDTOResponse execute(String id){
        validateIfPacienteExists(id);
        deletePacienteInDB(id);
        var httpDTOResponse = formattedResponse();
        return httpDTOResponse;
    }

    private void validateIfPacienteExists(String id){
        UUID uuid = UUID.fromString(id);
        if(this.pacienteRepository.findById(uuid).isEmpty()){
            throw new PacienteNotFoundException();
        }
    }

    private void deletePacienteInDB(String id){
        UUID uuid = UUID.fromString(id);
        this.pacienteRepository.deleteById(uuid);
    }

    private HttpDTOResponse formattedResponse(){
        var httpDTOResponse = HttpDTOResponse.builder()
                .message("Paciente deletado com sucesso")
                .build();

        return httpDTOResponse;
    }
}
