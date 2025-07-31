package com.romy.clinica.clinica.modules.services.dentista;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.dentista.DentistaDTOResponse;
import com.romy.clinica.clinica.modules.models.entities.DentistaEntity;
import com.romy.clinica.clinica.modules.models.repositories.DentistaRepository;

@Service
public class DentistaListService {
    @Autowired
    private DentistaRepository dentistaRepository;

    public List<DentistaDTOResponse> execute(){
        var dentistas = listarDentistas();
        var dentistasDTOResponse = formatDentistas(dentistas);

        return dentistasDTOResponse;
    }

    private List<DentistaEntity> listarDentistas(){
        return this.dentistaRepository.findAllIfAtivoTrue();
    }

    private List<DentistaDTOResponse> formatDentistas(List<DentistaEntity> dentistas){
        var dentistasDTOResponse = dentistas.stream()
                .map(dentista -> DentistaDTOResponse.builder()
                        .nome(dentista.getNome())
                        .cpf(dentista.getCpf())
                        .especialidade(dentista.getEspecialidade())
                        .build())
                .toList();

        return dentistasDTOResponse;
    }
}
