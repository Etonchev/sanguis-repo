package uol.sanguis;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import uol.sanguis.configuration.JwtAuthenticationConfig;
import uol.sanguis.controllers.UserController;
import uol.sanguis.entities.UserEntity;
import uol.sanguis.models.responses.UserDetailsResponse;
import uol.sanguis.services.UserService;
import uol.sanguis.utils.JwtUtil;

import java.text.SimpleDateFormat;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.util.AssertionErrors.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static uol.sanguis.FakeData.DATE;
import static uol.sanguis.FakeData.EMAIL;
import static uol.sanguis.FakeData.FIRST_NAME;
import static uol.sanguis.FakeData.LAST_NAME;
import static uol.sanguis.FakeData.PASSWORD;
import static uol.sanguis.FakeData.USER_LOGIN_REQUEST;
import static uol.sanguis.FakeData.USER_REGISTRATION_REQUEST;

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters = false)
public class UserControllerTests extends BaseControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    UserService userService;

    @MockBean
    SecurityContext securityContext;

    @MockBean
    Authentication authentication;

    @Test
    public void getUserDetails() throws Exception {
        // Arrange
        UserEntity userEntity = new UserEntity();
        userEntity.withEmail(EMAIL)
                .withPassword(PASSWORD)
                .withFirstName(FIRST_NAME)
                .withLastName(LAST_NAME)
                .withBirthDate(DATE);

        when(authentication.getPrincipal()).thenReturn(userEntity);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        // Act
        MvcResult result = mockMvc.perform(
                        get("/users/current")
                                .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        String responseBody = result.getResponse().getContentAsString();
        UserDetailsResponse expectedResponse = new UserDetailsResponse(EMAIL, FIRST_NAME, LAST_NAME, DATE);
        String expectedResponseAsJson = mapper.writeValueAsString(expectedResponse);
        assertTrue("The response body does not contain the expected data",
                responseBody.equals(expectedResponseAsJson));
    }

    @Test
    public void register() throws Exception {
        // Arrange
        String request = mapper.writeValueAsString(USER_REGISTRATION_REQUEST);
        UserEntity userEntity = new UserEntity();
        userEntity.withEmail(EMAIL)
                .withPassword(PASSWORD)
                .withFirstName(FIRST_NAME)
                .withLastName(LAST_NAME)
                .withBirthDate(DATE);

        when(userService.register(any())).thenReturn(userEntity);

        // Act
        MvcResult result = mockMvc.perform(
                        post("/users/register")
                                .contentType("application/json")
                                .content(request)
                                .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        String responseBody = result.getResponse().getContentAsString();
        UserDetailsResponse expectedResponse = new UserDetailsResponse(EMAIL, FIRST_NAME, LAST_NAME, DATE);
        String expectedResponseAsJson = mapper.writeValueAsString(expectedResponse);
        assertTrue("The response body does not contain the expected data",
                responseBody.equals(expectedResponseAsJson));
    }

    @Test
    public void login() throws Exception {
        // Arrange
        String request = mapper.writeValueAsString(USER_LOGIN_REQUEST);
        UserEntity userEntity = new UserEntity();
        userEntity.withEmail(EMAIL)
                .withPassword(PASSWORD)
                .withFirstName(FIRST_NAME)
                .withLastName(LAST_NAME)
                .withBirthDate(DATE);
        when(userService.login(any())).thenReturn(userEntity);

        // Act
        MvcResult result = mockMvc.perform(
                        post("/users/login")
                                .contentType("application/json")
                                .content(request)
                                .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        String responseBody = result.getResponse().getContentAsString();
        UserDetailsResponse expectedResponse = new UserDetailsResponse(EMAIL, FIRST_NAME, LAST_NAME, DATE);
        String expectedResponseAsJson = mapper.writeValueAsString(expectedResponse);
        assertTrue("The response body does not contain the expected data",
                responseBody.equals(expectedResponseAsJson));
    }
}