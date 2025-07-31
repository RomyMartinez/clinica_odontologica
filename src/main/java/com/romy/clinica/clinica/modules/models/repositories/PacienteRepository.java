package com.romy.clinica.clinica.modules.models.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.romy.clinica.clinica.modules.models.entities.PacienteEntity;

public interface PacienteRepository extends JpaRepository<PacienteEntity, UUID> { 
    Optional<PacienteEntity> findByCpf(String cpf);
    List<PacienteEntity> findByNomeContainingIgnoreCase(String nome);
    void deleteByCpf(String cpf);
}
