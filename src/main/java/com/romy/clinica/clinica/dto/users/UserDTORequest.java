package com.romy.clinica.clinica.dto.users;

import org.hibernate.validator.constraints.Length;

import com.romy.clinica.clinica.modules.models.enumTypes.Role;

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
public class UserDTORequest {

    @NotBlank()
    @Pattern(regexp = "\\\\S+", message = "Username deve conter letras")
    private String username;

    @NotBlank()
    @Length(min = 6, max = 20)
    private String password;

    @NotBlank()
    @Length(min = 6, max = 20)
    @Email(message = "Email inválido")
    private String email;

    @NotBlank()
    private Role role;
}
