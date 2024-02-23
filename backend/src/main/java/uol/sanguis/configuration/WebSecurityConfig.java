package uol.sanguis.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationConfig jwtAuthenticationConfig;

    public WebSecurityConfig(JwtAuthenticationConfig jwtAuthenticationConfig,
                             AuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationConfig = jwtAuthenticationConfig;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors((Customizer.withDefaults()))
                // Disable CSRF
                .csrf(AbstractHttpConfigurer::disable)
                // Authorization configuration
                .authorizeHttpRequests((authorize) -> authorize
                        // Permit login and register requests without authentication
                        .requestMatchers("/users/login", "/users/register").permitAll()
                        .anyRequest().authenticated()
                )
                // Do not create a session
                .sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(
                        SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                // Add username and password JWT filter
                .addFilterBefore(jwtAuthenticationConfig, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}