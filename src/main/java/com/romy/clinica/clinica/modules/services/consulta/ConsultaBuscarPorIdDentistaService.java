package com.romy.clinica.clinica.modules.services.consulta;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.errors.error_types.DentistaNotFoundExeception;
import com.romy.clinica.clinica.modules.models.entities.ConsultaEntity;
import com.romy.clinica.clinica.modules.models.repositories.ConsultaRepository;
import com.romy.clinica.clinica.modules.models.repositories.DentistaRepository;

@Service
public class ConsultaBuscarPorIdDentistaService {
    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private DentistaRepository dentistaRepository;

    public List<ConsultaEntity> execute(String dentistId){
           var uuid = UUID.fromString(dentistId);
           verificarSeDentistaExiste(uuid);
           var consultas = consultaRepository.findAllByDentistId(uuid);

           return consultas;
    }

    private void verificarSeDentistaExiste(UUID dentistId){

        if(dentistaRepository.findById(dentistId).isEmpty()){
            throw new DentistaNotFoundExeception();
        }
    }
}
