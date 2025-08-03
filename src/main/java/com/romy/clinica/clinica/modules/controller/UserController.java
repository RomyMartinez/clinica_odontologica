package com.romy.clinica.clinica.modules.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.romy.clinica.clinica.dto.users.UserDTORequest;
import com.romy.clinica.clinica.dto.users.UserUpdateDTORequest;
import com.romy.clinica.clinica.modules.services.users.UserCreateService;
import com.romy.clinica.clinica.modules.services.users.UserDeleteService;
import com.romy.clinica.clinica.modules.services.users.UserEditarService;
import com.romy.clinica.clinica.modules.services.users.UserListService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users/")
public class UserController {
    @Autowired
    private UserCreateService userCreateService;

    @Autowired
    private UserListService userListService;

    @Autowired
    private UserDeleteService userDeleteService;

    @Autowired
    private UserEditarService userEditarService;

    @PostMapping
    public ResponseEntity<Object> createUser(@Valid @RequestBody UserDTORequest userDTORequest){
        try{
            var userDTOResponse = this.userCreateService.execute(userDTORequest);
            return ResponseEntity.ok().body(userDTOResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Object> getUsers(){
        try{
            var userList = this.userListService.execute();
            return ResponseEntity.ok().body(userList);
            
        }   catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable String id){
        try{
            var userDTOResponse = this.userDeleteService.execute(id);
            return ResponseEntity.ok().body(userDTOResponse);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> editUser(@RequestBody UserUpdateDTORequest userUpdateDTORequest, @PathVariable String id){
        try{
            var userDTOResponse = this.userEditarService.execute(userUpdateDTORequest, id);
            return ResponseEntity.ok().body(userDTOResponse);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
