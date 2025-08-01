package com.romy.clinica.clinica.errors.error_types;

public class UserNotFoundExecption extends RuntimeException {
    public UserNotFoundExecption() {
        super("Usuário não encontrado");
    }
}
