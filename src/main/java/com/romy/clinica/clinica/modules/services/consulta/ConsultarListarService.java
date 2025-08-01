package com.romy.clinica.clinica.modules.services.consulta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.modules.models.entities.ConsultaEntity;
import com.romy.clinica.clinica.modules.models.enumTypes.StatusConsulta;
import com.romy.clinica.clinica.modules.models.repositories.ConsultaRepository;

@Service
public class ConsultarListarService {
    @Autowired
    private ConsultaRepository consultaRepository;

    public List<ConsultaEntity> execute(){
        var consultas = consultaRepository.findAllByStatus(StatusConsulta.AGENDADA);

        return consultas;
    }
}
