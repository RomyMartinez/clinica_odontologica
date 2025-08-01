package com.romy.clinica.clinica.dto.consulta;

import java.time.LocalDateTime;

import lombok.Data;


@Data
public class ConsultaUpdateDTORequest {
    private LocalDateTime dataHora;
    private String descricao;
}
