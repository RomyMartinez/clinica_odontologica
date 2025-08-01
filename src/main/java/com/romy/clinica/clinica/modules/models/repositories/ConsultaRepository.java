package com.romy.clinica.clinica.modules.models.repositories;


import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.romy.clinica.clinica.modules.models.entities.ConsultaEntity;
import com.romy.clinica.clinica.modules.models.enumTypes.StatusConsulta;

public interface ConsultaRepository extends JpaRepository<ConsultaEntity, UUID> {
    List<ConsultaEntity> findAllByStatus(StatusConsulta status);
    List<ConsultaEntity> findAllByDentistId(UUID dentistId);
}
