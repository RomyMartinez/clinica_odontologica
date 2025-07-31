package com.romy.clinica.clinica.dto.paciente;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PacienteDTOResponse {
    private String nome;
    private  String email;
    private  String telefone;
}
