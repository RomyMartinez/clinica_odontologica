package com.romy.clinica.clinica.modules.models.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.romy.clinica.clinica.modules.models.enumTypes.StatusConsulta;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "consulta")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsultaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotNull
    private LocalDateTime dataHora;

    private String descricao;

    @Enumerated(EnumType.STRING)
    private StatusConsulta status;

    @Column(name = "patient_id")
    private String patientId;

    @Column(name = "dentist_id")
    private String dentistId;

    @ManyToOne
    @JoinColumn(name = "patient_id", insertable = false, updatable = false)
    private PacienteEntity paciente;

    @ManyToOne
    @JoinColumn(name = "dentist_id", insertable = false, updatable = false)
    private DentistaEntity dentist;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
