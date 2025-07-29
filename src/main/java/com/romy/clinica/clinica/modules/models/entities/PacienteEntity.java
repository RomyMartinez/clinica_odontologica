package com.romy.clinica.clinica.modules.models.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "paciente")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PacienteEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank
    @Length(min = 3, max = 50)
    private String nome;

    @NotBlank
    @Length(min = 11, max = 11)
    private String cpf;

    @NotBlank
    @Length(min = 2, max = 50)
    private String telefone;

    @NotBlank
    @Length(min = 5, max = 255)
    private String email;

    @NotBlank
    private LocalDate dataNascimento;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
