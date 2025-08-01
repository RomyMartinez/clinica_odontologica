package com.romy.clinica.clinica.modules.services.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.dto.users.UserDTORequest;
import com.romy.clinica.clinica.dto.users.UserDTOResponse;
import com.romy.clinica.clinica.errors.error_types.UserFoundException;
import com.romy.clinica.clinica.modules.models.entities.UserEntity;
import com.romy.clinica.clinica.modules.models.repositories.UsersRepository;

@Service
public class UserCreateService {
    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDTOResponse execute(UserDTORequest userDTORequest){
        verifyIfUserOrEmailAlreadyExists(userDTORequest.getUsername(), userDTORequest.getEmail());
        var user = createUser(userDTORequest);
        var userDTOResponse = formatResponse(user);
        return userDTOResponse;
    }

    private void verifyIfUserOrEmailAlreadyExists(String username, String email){
        this.userRepository.findByUsernameOrEmail(username, email).ifPresent(
            user -> {
                throw new UserFoundException();
            }
        );
    }

    private UserEntity createUser(UserDTORequest userDTORequest){
        var password = passwordEncoder.encode(userDTORequest.getPassword());

        var user = UserEntity.builder()
                .username(userDTORequest.getUsername())
                .password(password)
                .email(userDTORequest.getEmail())
                .role(userDTORequest.getRole())
                .build();

        return this.userRepository.save(user);
    }

    private UserDTOResponse formatResponse(UserEntity user){
        var userDTOResponse = UserDTOResponse.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole())
                .build();

        return userDTOResponse;
    }
}
