package com.romy.clinica.clinica.modules.models.entities;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    private UUID id;

    @NotNull
    private LocalDateTime dataHora;

    private String descricao;

    @Enumerated(EnumType.STRING)
    private StatusConsulta status;

    @Column(name = "patient_id")
    private UUID patientId;

    @Column(name = "dentist_id")
    private UUID dentistId;

    @ManyToOne
    @JoinColumn(name = "patient_id", insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private PacienteEntity paciente;

    @ManyToOne
    @JoinColumn(name = "dentist_id", insertable = false, updatable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private DentistaEntity dentista;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
