package com.romy.clinica.clinica.errors.error_types;

public class DentistaNotFoundExeception extends RuntimeException {
    public DentistaNotFoundExeception() {
        super("Dentista não encontrada");
    }
}
