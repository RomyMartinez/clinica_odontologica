package com.romy.clinica.clinica.modules.services.users;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties.Http;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.htttpTypes.HttpDTOResponse;
import com.romy.clinica.clinica.errors.error_types.UserNotFoundExecption;
import com.romy.clinica.clinica.modules.models.entities.UserEntity;
import com.romy.clinica.clinica.modules.models.repositories.UsersRepository;

@Service
public class UserDeleteService {
    @Autowired
    private UsersRepository userRepository;

    public HttpDTOResponse execute(String id){
        var user = findInDB(id);
        deleteUser(user);

        return new HttpDTOResponse("User deleted successfully");
    }

    private UserEntity findInDB(String id){
        var uuid = UUID.fromString(id);
        var user = this.userRepository.findById(uuid);
        if(user.isEmpty()){
            throw new UserNotFoundExecption();
        }

        return user.get();
    }

    private void deleteUser(UserEntity user){
        this.userRepository.delete(user);
    }
}
