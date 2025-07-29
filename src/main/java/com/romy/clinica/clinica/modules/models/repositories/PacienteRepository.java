package com.romy.clinica.clinica.modules.models.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.romy.clinica.clinica.modules.models.entities.PacienteEntity;

public interface PacienteRepository extends JpaRepository<PacienteEntity, UUID> { 
    
}
