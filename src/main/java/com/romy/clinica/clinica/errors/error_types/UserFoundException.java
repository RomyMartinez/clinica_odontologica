package com.romy.clinica.clinica.errors.error_types;

public class UserFoundException extends RuntimeException {
    public UserFoundException() {
        super("Usuário já existe");
    }
}
