package uol.sanguis;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import uol.sanguis.configuration.JwtAuthenticationConfig;

import static org.mockito.Mockito.mock;

@Profile("test")
@Configuration
public class TestConfiguration {
    @Bean
    public JwtAuthenticationConfig jwtAuthenticationConfig() {
        return mock(JwtAuthenticationConfig.class);
    }
}