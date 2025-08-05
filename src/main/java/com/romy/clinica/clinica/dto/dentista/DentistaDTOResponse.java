package com.romy.clinica.clinica.dto.dentista;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DentistaDTOResponse {
    private UUID id;
    private String nome;
    private String cpf;
    private String especialidade;
}
