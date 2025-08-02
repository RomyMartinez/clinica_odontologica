package com.romy.clinica.clinica.modules.services.consulta;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.consulta.ConsultaDTORequest;
import com.romy.clinica.clinica.dto.consulta.ConsultaDTOResponse;
import com.romy.clinica.clinica.errors.error_types.DentistaNotFoundExeception;
import com.romy.clinica.clinica.errors.error_types.PacienteNotFoundException;
import com.romy.clinica.clinica.modules.models.entities.ConsultaEntity;
import com.romy.clinica.clinica.modules.models.enumTypes.StatusConsulta;
import com.romy.clinica.clinica.modules.models.repositories.ConsultaRepository;
import com.romy.clinica.clinica.modules.models.repositories.DentistaRepository;
import com.romy.clinica.clinica.modules.models.repositories.PacienteRepository;

@Service
public class ConsultaAgendarService {
    @Autowired
    private ConsultaRepository consultaRepository;

    @Autowired
    private DentistaRepository dentistaRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    public ConsultaDTOResponse execute(ConsultaDTORequest consultaAgendarDTORequest){
        verificarSeDentistaExiste(consultaAgendarDTORequest.getDentistaId());
        verificarSePacienteExiste(consultaAgendarDTORequest.getPacienteId());
        var consulta = criarConsulta(consultaAgendarDTORequest);
        salvarConsulta(consulta);
        var consultaDTOResponse = formattedResponse(consulta);

        return consultaDTOResponse;
        
    }

    private void verificarSeDentistaExiste(String dentistaId){
        var uuid = UUID.fromString(dentistaId);
        if(this.dentistaRepository.findById(uuid).isEmpty()){
            throw new DentistaNotFoundExeception();
        }
    }

    private void verificarSePacienteExiste(String pacienteId){
        var uuid = UUID.fromString(pacienteId);
        if(this.pacienteRepository.findById(uuid).isEmpty()){
            throw new PacienteNotFoundException();
        }
    }

    private ConsultaEntity criarConsulta(ConsultaDTORequest consultaAgendarDTORequest){
        var consulta = ConsultaEntity.builder()
                .dataHora(consultaAgendarDTORequest.getDataHora())
                .descricao(consultaAgendarDTORequest.getDescricao())
                .dentistId(UUID.fromString(consultaAgendarDTORequest.getDentistaId()))
                .patientId(UUID.fromString(consultaAgendarDTORequest.getPacienteId()))
                .status(StatusConsulta.AGENDADA)
                .build();

        return consulta;
    }

    private void salvarConsulta(ConsultaEntity consulta){
        this.consultaRepository.save(consulta);
    }

    private ConsultaDTOResponse formattedResponse(ConsultaEntity consulta){
        var consultaDTOResponse = ConsultaDTOResponse.builder()
                .dataHora(consulta.getDataHora())
                .descricao(consulta.getDescricao())
                .build();

        return consultaDTOResponse;
    }
}
