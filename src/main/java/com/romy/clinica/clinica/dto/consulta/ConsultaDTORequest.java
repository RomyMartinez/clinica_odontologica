package com.romy.clinica.clinica.dto.consulta;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsultaDTORequest {

    @NotBlank()
    private String pacienteId;

    @NotBlank()
    private String dentistaId;

    @NotBlank()
    private String descricao;

    @NotNull()
    @Future(message = "Data de consulta deve ser no futuro")
    private LocalDateTime dataHora;
}
