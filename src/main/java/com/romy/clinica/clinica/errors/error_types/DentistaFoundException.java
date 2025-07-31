package com.romy.clinica.clinica.errors.error_types;

public class DentistaFoundException extends RuntimeException {
    
    public DentistaFoundException() {
        super("Dentista já existe");
    }
}
