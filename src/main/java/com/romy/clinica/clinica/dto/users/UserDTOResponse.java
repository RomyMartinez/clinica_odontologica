package com.romy.clinica.clinica.dto.users;

import com.romy.clinica.clinica.modules.models.enumTypes.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTOResponse {
    private String username;
    private String email;
    private Role role;
}
