package com.romy.clinica.clinica.modules.services.consulta;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.errors.error_types.ConsultaNotFoundExeception;
import com.romy.clinica.clinica.modules.models.entities.ConsultaEntity;
import com.romy.clinica.clinica.modules.models.repositories.ConsultaRepository;


@Service
public class ConsultarBuscarPorIdService {
    @Autowired
    private ConsultaRepository consultaRepository;

    public ConsultaEntity execute(String id){
        verificarSeConsultaExiste(id);
        var consulta = findInDb(id);

        return consulta;
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

}
