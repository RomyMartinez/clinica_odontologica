package com.romy.clinica.clinica.modules.services.dentista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.htttpTypes.HttpDTOResponse;
import com.romy.clinica.clinica.errors.error_types.DentistaNotFoundExeception;
import com.romy.clinica.clinica.modules.models.entities.DentistaEntity;
import com.romy.clinica.clinica.modules.models.repositories.DentistaRepository;

@Service
public class DentistaDeleteService {
    @Autowired
    private DentistaRepository dentistaRepository;

    public HttpDTOResponse execute(String cpf){
        var dentista = findInDB(cpf);
        deleteDentista(dentista);

        var httpDTOResponse = formattedResponse();

        return httpDTOResponse;
    }

    private DentistaEntity findInDB(String cpf){
        var dentista = this.dentistaRepository.findByCpf(cpf);
        if(dentista.isEmpty()){
            throw new DentistaNotFoundExeception();
        }

        return dentista.get();
    }

    private void deleteDentista(DentistaEntity dentista){
        this.dentistaRepository.delete(dentista);
    }

    private HttpDTOResponse formattedResponse(){
        var httpDTOResponse = HttpDTOResponse.builder()
                .message("Dentista deletado com sucesso")
                .build();

        return httpDTOResponse;
    }
}
