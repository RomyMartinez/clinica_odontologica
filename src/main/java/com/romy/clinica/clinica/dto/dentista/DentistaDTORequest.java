package com.romy.clinica.clinica.dto.dentista;

import jakarta.validation.constraints.Email;
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
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Nome deve conter letras e espaços")
    private String nome;

    @NotBlank()
    @Email(message = "Email inválido")
    private String email;

    @NotBlank()
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "Cro deve conter 10 dígitos")
    private String cro;

    @NotBlank()
    @Pattern(regexp = "^[a-zA-Z]+$", message = "Especialidade deve conter letras")
    private String especialidade;
}
