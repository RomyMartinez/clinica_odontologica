package com.romy.clinica.clinica.dto.dentista;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DentistaDTORequest {
    @NotBlank()
    @Pattern(regexp = "^[0-9]{11}$", message = "CPF deve conter 11 dígitos")
    private String cpf;

    @NotBlank()
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Nome deve conter letras")
    private String nome;

    @NotBlank()
    @Pattern(regexp = "^[0-9]{2}$", message = "Cro deve conter 2 dígitos")
    private String cro;

    @NotBlank()
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Especialidade deve conter letras")
    private String especialidade;
}
