package com.romy.clinica.clinica.modules.models.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserEntity extends JpaRepository<UserEntity, UUID> {
    
}
