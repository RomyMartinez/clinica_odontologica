package com.romy.clinica.clinica.modules.services.dentista;

import org.springframework.beans.factory.annotation.Autowired;

import com.romy.clinica.clinica.dto.dentista.DentistaDTORequest;
import com.romy.clinica.clinica.dto.dentista.DentistaDTOResponse;
import com.romy.clinica.clinica.errors.error_types.DentistaFoundException;
import com.romy.clinica.clinica.modules.models.entities.DentistaEntity;
import com.romy.clinica.clinica.modules.models.repositories.DentistaRepository;

public class DentistaCreateService {
    @Autowired
    private DentistaRepository dentistaRepository;
    
    public DentistaDTOResponse execute(DentistaDTORequest dentistaDTORequest){
        validateIfDentistaAlreadyExists(dentistaDTORequest.getCpf());
        var dentistaSaved = insertDentista(dentistaDTORequest);
        var dentistaDTOResponse = formattedResponse(dentistaSaved);

        return dentistaDTOResponse;

    }

    private void validateIfDentistaAlreadyExists(String cpf){
        this.dentistaRepository.findByCpf(cpf).ifPresent(
            dentista -> {
                throw new DentistaFoundException();
            }
        );
    
    }

    private DentistaEntity insertDentista(DentistaDTORequest dentistaDTORequest){
        var dentistaEntity = DentistaEntity.builder()
                .cpf(dentistaDTORequest.getCpf())
                .nome(dentistaDTORequest.getNome())
                .cro(dentistaDTORequest.getCro())
                .email(dentistaDTORequest.getEmail())
                .especialidade(dentistaDTORequest.getEspecialidade())
                .ativo(true)
                .build();

        return this.dentistaRepository.save(dentistaEntity);
    }

    private DentistaDTOResponse formattedResponse(DentistaEntity dentistaEntity){
        var dentistaDTOResponse = DentistaDTOResponse.builder()
                .nome(dentistaEntity.getNome())
                .cpf(dentistaEntity.getCpf())
                .especialidade(dentistaEntity.getEspecialidade())
                .build();

        return dentistaDTOResponse;
    }
}
