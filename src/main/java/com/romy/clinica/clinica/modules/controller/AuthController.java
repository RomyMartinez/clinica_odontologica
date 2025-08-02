package com.romy.clinica.clinica.modules.controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.romy.clinica.clinica.dto.users.UserLoginRequest;
import com.romy.clinica.clinica.modules.services.users.UserLoginService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserLoginService userLoginService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserLoginRequest userLoginRequest){
        try {
            var user = userLoginService.execute(userLoginRequest);
            return ResponseEntity.ok().body(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
