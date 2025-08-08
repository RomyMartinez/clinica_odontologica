package com.romy.clinica.clinica.dto.paciente;

import java.time.LocalDate;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PacienteDTORequest {
    @NotBlank()
    @Pattern(regexp = "^[a-zA-Z\\s]+$", message = "Nome deve conter letras e espaços")
    @Length(min = 3, max = 50)
    private String nome;

    @NotBlank()
    @Length(min = 11, max = 11, message="CPF deve conter 11 dígitos")
    private String cpf;

    @NotBlank()
    @Length(min = 2, max = 50)
    private String telefone;

    @NotBlank()
    @Email(message = "Campo de email inválido")
    private String email;

    @NotNull()
    @Past(message = "Data de nascimento deve ser no passado")
    private LocalDate dataNascimento;
}
