package com.romy.clinica.clinica.modules.services.dentista;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.dentista.DentistaDTOResponse;
import com.romy.clinica.clinica.errors.error_types.DentistaNotFoundExeception;
import com.romy.clinica.clinica.modules.models.entities.DentistaEntity;
import com.romy.clinica.clinica.modules.models.repositories.DentistaRepository;

@Service
public class DentistaFindByIdService {
    @Autowired
    private DentistaRepository dentistaRepository;

    public DentistaDTOResponse execute(String id){
        var dentista = findByIdinDB(id);
        System.out.println("Dentista: " + dentista);
        var dentistaDTOResponse = formatResponse(dentista);

        return dentistaDTOResponse;
    }

    private DentistaEntity findByIdinDB(String id){
        UUID uuid = UUID.fromString(id);
        if(this.dentistaRepository.findById(uuid).isEmpty()){
            throw new DentistaNotFoundExeception();
        }

        return this.dentistaRepository.findById(uuid).get();
    }

    private DentistaDTOResponse formatResponse(DentistaEntity dentista){
        var dentistaDTOResponse = DentistaDTOResponse.builder()
                .nome(dentista.getNome())
                .cpf(dentista.getCpf())
                .especialidade(dentista.getEspecialidade())
                .build();

        return dentistaDTOResponse;
    }
}
