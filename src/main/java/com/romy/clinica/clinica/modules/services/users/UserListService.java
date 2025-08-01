package com.romy.clinica.clinica.modules.services.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.romy.clinica.clinica.modules.models.entities.UserEntity;
import com.romy.clinica.clinica.modules.models.repositories.UsersRepository;

@Service
public class UserListService {
    @Autowired
    private UsersRepository userRepository;

    public List<UserEntity> execute(){
        return this.userRepository.findAll();
    }
}
