package com.romy.clinica.clinica.errors.error_types;

public class PacienteNotFoundException extends RuntimeException {
    public PacienteNotFoundException() {
        super("O paciente não foi encontrado");
    }
    
}
