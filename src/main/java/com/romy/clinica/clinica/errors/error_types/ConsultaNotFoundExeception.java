package com.romy.clinica.clinica.errors.error_types;


public class ConsultaNotFoundExeception extends RuntimeException {

    public ConsultaNotFoundExeception() {
        super("Consulta não encontrada");
    }
    
}
