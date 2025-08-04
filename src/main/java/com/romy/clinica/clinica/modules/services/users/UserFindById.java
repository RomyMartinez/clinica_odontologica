package com.romy.clinica.clinica.modules.services.users;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.users.UserDTOResponse;
import com.romy.clinica.clinica.errors.error_types.UserNotFoundExecption;
import com.romy.clinica.clinica.modules.models.entities.UserEntity;
import com.romy.clinica.clinica.modules.models.repositories.UsersRepository;

@Service
public class UserFindById {
    @Autowired
    private UsersRepository userFindByIdService;

    public UserDTOResponse execute(String id){
        var user = verifyIfUserExists(id);
        var formattedUser = formatUser(user);

        return formattedUser;
    }

    private UserDTOResponse formatUser(UserEntity user){
        var userDTOResponse = UserDTOResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

        return userDTOResponse;
    }

    private UserEntity verifyIfUserExists(String id){
        UUID uuid = UUID.fromString(id);
        var user = this.userFindByIdService.findById(uuid);
        if(user.isEmpty()){
            throw new UserNotFoundExecption();
        }
        return user.get();
    }
}
