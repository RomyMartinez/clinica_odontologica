package com.romy.clinica.clinica.modules.services.consulta;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.htttpTypes.HttpDTOResponse;
import com.romy.clinica.clinica.errors.error_types.ConsultaNotFoundExeception;
import com.romy.clinica.clinica.modules.models.entities.ConsultaEntity;
import com.romy.clinica.clinica.modules.models.enumTypes.StatusConsulta;
import com.romy.clinica.clinica.modules.models.repositories.ConsultaRepository;

@Service
public class ConsultaConcluidaService {
    @Autowired
    private ConsultaRepository consultaRepository;

    public HttpDTOResponse execute(String id){
        verificarSeConsultaExiste(id);
        var consulta = findInDb(id);
        consulta.setStatus(StatusConsulta.CONCLUIDA);
        this.consultaRepository.save(consulta);

        var consultaDTOResponse = formattedResponse();

        return consultaDTOResponse;
    }

    private void verificarSeConsultaExiste(String id){
        var uuid = UUID.fromString(id);
        if(this.consultaRepository.findById(uuid).isEmpty()){
            throw new ConsultaNotFoundExeception();
        }
    }

    private ConsultaEntity findInDb(String id){
        var uuid = UUID.fromString(id);
        return this.consultaRepository.findById(uuid).get();
    }

    private HttpDTOResponse formattedResponse(){
        var httpDTOResponse = HttpDTOResponse.builder()
                .message("Consulta Concluida")
                .build();

        return httpDTOResponse;
    }
}
