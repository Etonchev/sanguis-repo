package uol.sanguis;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.test.mock.mockito.MockBean;
import uol.sanguis.configuration.JwtAuthenticationConfig;
import uol.sanguis.utils.JwtUtil;

import java.text.SimpleDateFormat;

public class BaseControllerTest {
    @MockBean
    JwtAuthenticationConfig jwtAuthenticationConfig;

    @MockBean
    JwtUtil jwtUtil;

    protected final ObjectMapper mapper;

    public BaseControllerTest() {
        mapper = new ObjectMapper();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        mapper.setDateFormat(dateFormat);
    }
}