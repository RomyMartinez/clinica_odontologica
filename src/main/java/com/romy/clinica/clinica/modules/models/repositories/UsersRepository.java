package com.romy.clinica.clinica.modules.models.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.romy.clinica.clinica.modules.models.entities.UserEntity;

public interface UsersRepository extends JpaRepository<UserEntity, UUID> {
    Optional<UserEntity> findByUsernameOrEmail(String username, String email);
    Optional<UserEntity> findByUsername(String username);
}
