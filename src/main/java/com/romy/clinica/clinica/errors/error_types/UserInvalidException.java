package com.romy.clinica.clinica.errors.error_types;

public class UserInvalidException extends RuntimeException {
    public UserInvalidException() {
        super("Dados de login inválidos");
    }
    
}
