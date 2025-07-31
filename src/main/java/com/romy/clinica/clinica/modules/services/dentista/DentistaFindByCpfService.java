package com.romy.clinica.clinica.modules.services.dentista;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.dentista.DentistaDTOResponse;
import com.romy.clinica.clinica.errors.error_types.DentistaNotFoundExeception;
import com.romy.clinica.clinica.modules.models.entities.DentistaEntity;
import com.romy.clinica.clinica.modules.models.repositories.DentistaRepository;

@Service
public class DentistaFindByCpfService {
    @Autowired
    private DentistaRepository dentistaRepository;

    public DentistaDTOResponse execute(String cpf){
        var dentista = findByCpf(cpf);
        var dentistaDTOResponse = formatResponse(dentista);

        return dentistaDTOResponse;
    }

    private DentistaEntity findByCpf(String cpf){
        UUID uuid = UUID.fromString(cpf);
        if(this.dentistaRepository.findByCpf(cpf).isEmpty()){
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
