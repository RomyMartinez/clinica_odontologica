package com.romy.clinica.clinica.modules.services.users;

import java.time.Duration;
import java.time.Instant;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.romy.clinica.clinica.dto.users.UserLoginDTOResponse;
import com.romy.clinica.clinica.dto.users.UserLoginRequest;
import com.romy.clinica.clinica.errors.error_types.UserInvalidException;
import com.romy.clinica.clinica.modules.models.entities.UserEntity;
import com.romy.clinica.clinica.modules.models.repositories.UsersRepository;

@Service
public class UserLoginService {

    @Value("${security.token.secret}")
    private String secretKey;

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserLoginDTOResponse execute(UserLoginRequest userLoginRequest){
        var user = verificarSeUsuarioExiste(userLoginRequest.getUsername());
        verificarSenhaCorreta(user, userLoginRequest.getPassword());
        var token = createToken(user);
        var userLoginResponse = formattedResponse(token);

        return userLoginResponse;
    }

    private UserEntity verificarSeUsuarioExiste(String username){
        var user = this.userRepository.findByUsername(username).orElseThrow(
            () -> new UserInvalidException()
        );

        return user;
    }

    private void verificarSenhaCorreta(UserEntity user, String password){
        boolean passwordMatch = this.passwordEncoder.matches(password, user.getPassword());
        if(!passwordMatch){
            throw new UserInvalidException();
        }
    }

    private String createToken(UserEntity user){
        var duration = Instant.now().plus(Duration.ofHours(24));
        Algorithm algorithm = Algorithm.HMAC256(secretKey);

        var token = JWT.create().withIssuer("clinica")
                .withSubject(user.getUsername())
                .withExpiresAt(duration)
                .withClaim("roles", Arrays.asList(user.getRole().name().toUpperCase()))
                .sign(algorithm);

        return token;
    }

    private UserLoginDTOResponse formattedResponse(String token){
        var userLoginDTOResponse = UserLoginDTOResponse.builder()
                .access_token(token)
                .expires_in(Duration.ofHours(24).toMillis())
                .build();

        return userLoginDTOResponse;
    }
}
