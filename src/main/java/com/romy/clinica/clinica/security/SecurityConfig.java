package com.romy.clinica.clinica.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> {
            auth
            .requestMatchers("/auth/**").permitAll()
            .requestMatchers("/paciente/**").hasAnyRole("DENTISTA", "SECRETARIA")
            .requestMatchers("/dentista/**").hasAnyRole("ADMIN", "DENTISTA")
            .requestMatchers("/consulta/**").hasAnyRole("DENTISTA", "SECRETARIA")
            .requestMatchers("/users/**").permitAll()
            .anyRequest().authenticated();
        });
        return http.build();
        
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
