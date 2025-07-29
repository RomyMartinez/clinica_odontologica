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
    public String nome;
    public String email;
    public String telefone;
}
