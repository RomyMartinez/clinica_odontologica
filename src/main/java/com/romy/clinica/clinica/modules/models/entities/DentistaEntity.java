package com.romy.clinica.clinica.modules.models.entities;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "dentista")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DentistaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank
    private String nome;

    @NotBlank
    private String cro;

    @NotBlank()
    private String email;

    @NotBlank
    private String cpf;

    @Column(nullable = false)
    private Boolean ativo;

    @NotBlank
    private String especialidade;

    @OneToMany(mappedBy = "dentista")
    private List<ConsultaEntity> consultas;
}