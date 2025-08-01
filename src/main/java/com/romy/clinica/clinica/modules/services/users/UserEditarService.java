package com.romy.clinica.clinica.modules.services.users;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.htttpTypes.HttpDTOResponse;
import com.romy.clinica.clinica.dto.users.UserUpdateDTORequest;
import com.romy.clinica.clinica.errors.error_types.UserNotFoundExecption;
import com.romy.clinica.clinica.modules.models.entities.UserEntity;
import com.romy.clinica.clinica.modules.models.repositories.UsersRepository;

@Service
public class UserEditarService {
    @Autowired
    private UsersRepository userRepository;

    public HttpDTOResponse execute(UserUpdateDTORequest userUpdateDTORequest, String id){
        var user = findByIdinDB(id);
        atualizarUser(user, userUpdateDTORequest);
        var formatResponse = formatResponse();

        return formatResponse;
    }

    private UserEntity findByIdinDB(String id){
        UUID uuid = UUID.fromString(id);
        var user = this.userRepository.findById(uuid);
        if(user.isEmpty()){
            throw new UserNotFoundExecption();
        }

        return user.get();
    }

    private UserEntity atualizarUser(UserEntity user, UserUpdateDTORequest userUpdateDTORequest){
        if(!userUpdateDTORequest.getUsername().isEmpty()) user.setUsername(userUpdateDTORequest.getUsername());
        if(!userUpdateDTORequest.getPassword().isEmpty()) user.setPassword(userUpdateDTORequest.getPassword());
        if(!userUpdateDTORequest.getEmail().isEmpty()) user.setEmail(userUpdateDTORequest.getEmail());
        if(!userUpdateDTORequest.getRole().name().isEmpty()) user.setRole(userUpdateDTORequest.getRole());

        this.userRepository.save(user);

        return user;
    }

    private HttpDTOResponse formatResponse(){
        HttpDTOResponse httpDTOResponse = HttpDTOResponse.builder()
                .message("Usuário atualizado com sucesso")
                .build();

        return httpDTOResponse;
    }
}
