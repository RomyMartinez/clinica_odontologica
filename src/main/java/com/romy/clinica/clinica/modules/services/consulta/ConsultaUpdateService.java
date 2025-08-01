package com.romy.clinica.clinica.modules.services.consulta;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.consulta.ConsultaDTOResponse;
import com.romy.clinica.clinica.dto.consulta.ConsultaUpdateDTORequest;
import com.romy.clinica.clinica.modules.models.entities.ConsultaEntity;
import com.romy.clinica.clinica.modules.models.repositories.ConsultaRepository;

@Service
public class ConsultaUpdateService {
    @Autowired
    private ConsultaRepository consultaRepository;

    public ConsultaDTOResponse execute(ConsultaUpdateDTORequest consultaUpdateDTORequest, String id){
        var consulta = findInDB(id);
        consulta.setDataHora(consultaUpdateDTORequest.getDataHora());
        consulta.setDescricao(consultaUpdateDTORequest.getDescricao());
        var consultaDTOResponse = formattedResponse(consulta);
        this.consultaRepository.save(consulta);

        return consultaDTOResponse;
    }

    private ConsultaEntity findInDB(String id){
        var uuid = UUID.fromString(id);
        return this.consultaRepository.findById(uuid).get();
    }

    private ConsultaDTOResponse formattedResponse(ConsultaEntity consulta){
        var consultaDTOResponse = ConsultaDTOResponse.builder()
                .dataHora(consulta.getDataHora())
                .descricao(consulta.getDescricao())
                .build();

        return consultaDTOResponse;
    }
}
