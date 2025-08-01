package com.romy.clinica.clinica.dto.dentista;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DentistaUpdateDTORequest {
    private String nome;
    private String cro;
    private String email;
    private String cpf;
    private String especialidade;
    private boolean ativo;
}
