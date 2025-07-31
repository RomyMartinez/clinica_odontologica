package com.romy.clinica.clinica.modules.services.dentista;

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

    public HttpDTOResponse execute(String cpf){
        var dentista = findInDB(cpf);
        var dentistaDesativado = desativarDentista(dentista);
        salvarDentista(dentistaDesativado);
        var httpDTOResponse = formatResponse();
        
        return httpDTOResponse;
    }

    private DentistaEntity findInDB(String cpf){
        var dentista = this.dentistaRepository.findByCpf(cpf);
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
