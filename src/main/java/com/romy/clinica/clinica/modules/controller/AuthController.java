package com.romy.clinica.clinica.modules.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.romy.clinica.clinica.dto.users.UserLoginRequest;
import com.romy.clinica.clinica.modules.services.users.UserFindByIdService;
import com.romy.clinica.clinica.modules.services.users.UserLoginService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserLoginService userLoginService;

    @Autowired
    private UserFindByIdService userFindByIdService;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody UserLoginRequest userLoginRequest){
        System.out.println("Login");
        try {
            var user = userLoginService.execute(userLoginRequest);
            return ResponseEntity.ok().body(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("get-user")
    public ResponseEntity<Object> getUser(HttpServletRequest request){
        var id = request.getAttribute("user_id");
        try{
            var userDTOResponse = this.userFindByIdService.execute(id.toString());
            return ResponseEntity.ok().body(userDTOResponse);
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
