package com.romy.clinica.clinica.dto.consulta;
import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConsultaDTOResponse {
    private UUID id;
    private UUID pacienteId;
    private UUID dentistaId;
    private LocalDateTime dataHora;
    private String descricao;
}
