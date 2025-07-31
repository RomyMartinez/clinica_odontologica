package com.romy.clinica.clinica.errors.error_types;

public class PacienteFoundException extends RuntimeException {
    public PacienteFoundException() {
        super("O paciente já existe");
    }
}