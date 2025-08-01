package com.romy.clinica.clinica.modules.services.dentista;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.dentista.DentistaUpdateDTORequest;
import com.romy.clinica.clinica.dto.htttpTypes.HttpDTOResponse;
import com.romy.clinica.clinica.errors.error_types.DentistaFoundException;
import com.romy.clinica.clinica.errors.error_types.DentistaNotFoundExeception;
import com.romy.clinica.clinica.modules.models.entities.DentistaEntity;
import com.romy.clinica.clinica.modules.models.repositories.DentistaRepository;

@Service
public class DentistaUpdateService {
    @Autowired
    private DentistaRepository dentistaRepository;

    public HttpDTOResponse execute(DentistaUpdateDTORequest dentistaUpdateDTORequest, String id){
        var dentista = findByIdinDB(id);
        verficarSeCpfCorreto(dentistaUpdateDTORequest);
        var dentistaAtualizado = atualizarDentista(dentista, dentistaUpdateDTORequest);
        salvarDentista(dentistaAtualizado);
        var httpDTOResponse = formattedResponse();
        
        return httpDTOResponse;
    }

    private DentistaEntity findByIdinDB(String id){
        UUID uuid = UUID.fromString(id);
        if(this.dentistaRepository.findById(uuid).isEmpty()){
            throw new DentistaNotFoundExeception();
        }

        return this.dentistaRepository.findById(uuid).get();
    }

    private void verficarSeCpfCorreto(DentistaUpdateDTORequest dentistaUpdateDTORequest){
        var cpf = dentistaUpdateDTORequest.getCpf();
        
        if(!cpf.isEmpty()){
            this.dentistaRepository.findByCpf(cpf).ifPresent(dentista -> {
                throw new DentistaFoundException();
            });
        }
    }

    private DentistaEntity atualizarDentista(DentistaEntity dentista, DentistaUpdateDTORequest dentistaUpdateDTORequest){
        if(!dentistaUpdateDTORequest.getNome().isEmpty()) dentista.setNome(dentista.getNome());
        if(!dentistaUpdateDTORequest.getCpf().isEmpty()) dentista.setCpf(dentista.getCpf());
        if(!dentistaUpdateDTORequest.getEmail().isEmpty()) dentista.setEmail(dentista.getEmail());
        if(!dentistaUpdateDTORequest.getCro().isEmpty()) dentista.setCro(dentista.getCro());
        if(!dentistaUpdateDTORequest.getEspecialidade().isEmpty()) dentista.setEspecialidade(dentista.getEspecialidade());
        var dentistaAtualizado = dentista;

        return dentistaAtualizado;
    }

    private void salvarDentista(DentistaEntity dentistaAtualizado){
        this.dentistaRepository.save(dentistaAtualizado);
    }

    private HttpDTOResponse formattedResponse(){
        var httpDTOResponse = HttpDTOResponse.builder()
                .message("Dentista atualizado com sucesso")
                .build();

        return httpDTOResponse;
    }
}
