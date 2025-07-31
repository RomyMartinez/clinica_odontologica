package com.romy.clinica.clinica.modules.services.paciente;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.htttpTypes.HttpDTOResponse;
import com.romy.clinica.clinica.errors.error_types.PacienteNotFoundException;
import com.romy.clinica.clinica.modules.models.repositories.PacienteRepository;

@Service
public class PacienteDeleteService {
    @Autowired
    private PacienteRepository pacienteRepository;

    public HttpDTOResponse execute(String cpf){
        validateIfPacienteExists(cpf);
        deletePacienteInDB(cpf);
        var httpDTOResponse = formattedResponse();
        return httpDTOResponse;
    }

    private void validateIfPacienteExists(String cpf){
        if(this.pacienteRepository.findByCpf(cpf).isEmpty()){
            throw new PacienteNotFoundException();
        }
    }

    private void deletePacienteInDB(String cpf){
        this.pacienteRepository.deleteByCpf(cpf);
    }

    private HttpDTOResponse formattedResponse(){
        var httpDTOResponse = HttpDTOResponse.builder()
                .message("Paciente deletado com sucesso")
                .build();

        return httpDTOResponse;
    }
}
