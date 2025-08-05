package com.romy.clinica.clinica.dto.paciente;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PacienteDTOResponse {
    private UUID id;
    private String cpf;
    private String nome;
    private  String email;
    private  String telefone;
}
