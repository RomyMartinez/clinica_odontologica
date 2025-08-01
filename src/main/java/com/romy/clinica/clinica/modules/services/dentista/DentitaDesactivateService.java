package com.romy.clinica.clinica.modules.services.dentista;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.htttpTypes.HttpDTOResponse;
import com.romy.clinica.clinica.errors.error_types.DentistaNotFoundExeception;
import com.romy.clinica.clinica.modules.models.entities.DentistaEntity;
import com.romy.clinica.clinica.modules.models.repositories.DentistaRepository;

@Service
public class DentitaDesactivateService {

    @Autowired
    private DentistaRepository dentistaRepository;

    public HttpDTOResponse execute(String id){
        var dentista = findInDB(id);
        var dentistaDesativado = desativarDentista(dentista);
        salvarDentista(dentistaDesativado);
        var httpDTOResponse = formatResponse();
        
        return httpDTOResponse;
    }

    private DentistaEntity findInDB(String id){
        var uuid = UUID.fromString(id);
        var dentista = this.dentistaRepository.findById(uuid);
        if(dentista.isEmpty()){
            throw new DentistaNotFoundExeception();
        }

        return dentista.get();
    }

    private DentistaEntity desativarDentista(DentistaEntity dentista){
        dentista.setAtivo(false);

        return dentista;
    }

    private void salvarDentista(DentistaEntity dentistaDesativado){
        this.dentistaRepository.save(dentistaDesativado);
    }

    private HttpDTOResponse formatResponse(){
        var httpDTOResponse = HttpDTOResponse.builder()
                .message("Dentista desativado com sucesso")
                .build();

        return httpDTOResponse;
    }
}
