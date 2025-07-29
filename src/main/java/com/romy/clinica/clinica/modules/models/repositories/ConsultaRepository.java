package com.romy.clinica.clinica.modules.models.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.romy.clinica.clinica.modules.models.entities.ConsultaEntity;

public interface ConsultaRepository extends JpaRepository<ConsultaEntity, UUID> {
    
}
