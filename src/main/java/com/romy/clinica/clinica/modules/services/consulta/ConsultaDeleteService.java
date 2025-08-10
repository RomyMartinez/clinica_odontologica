package com.romy.clinica.clinica.modules.services.consulta;

import com.romy.clinica.clinica.modules.models.repositories.ConsultaRepository;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConsultaDeleteService {

    @Autowired
    private ConsultaRepository consultaRepository;

    public void execute(String id) {
        UUID uuid = UUID.fromString(id);
        consultaRepository.deleteById(uuid);
    }
}
