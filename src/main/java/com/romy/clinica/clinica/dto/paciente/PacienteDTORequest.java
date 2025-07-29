package com.romy.clinica.clinica.dto.paciente;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PacienteDTORequest {
    private String nome;
    private String cpf;
    private String telefone;
    private String email;
    private LocalDateTime dataNascimento;
}
