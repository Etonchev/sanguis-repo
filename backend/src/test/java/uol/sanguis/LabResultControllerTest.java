package uol.sanguis;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import uol.sanguis.controllers.LabResultController;
import uol.sanguis.models.QueryResult;
import uol.sanguis.services.LabResultService;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.util.AssertionErrors.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static uol.sanguis.FakeData.BLOOD_TEST_DETAILED_RESPONSE_LIST;
import static uol.sanguis.FakeData.CREATE_LAB_RESULT;
import static uol.sanguis.FakeData.LAB_RESULT;
import static uol.sanguis.FakeData.LAB_RESULT_LIST;
import static uol.sanguis.FakeData.USER_REGISTRATION_REQUEST;
import static uol.sanguis.FakeData.UUID_STRING;

@WebMvcTest(LabResultController.class)
@AutoConfigureMockMvc(addFilters = false)
public class LabResultControllerTest extends BaseControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    LabResultService labResultService;

    @Test
    public void getLabResults() throws Exception {
        // Arrange
        when(labResultService.getLabResults()).thenReturn(LAB_RESULT_LIST);

        // Act
        MvcResult result = mockMvc.perform(
                        get("/lab-results")
                                .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        String responseBody = result.getResponse().getContentAsString();
        QueryResult queryResult = new QueryResult<>(LAB_RESULT_LIST,
                LAB_RESULT_LIST.size(), 0, 20);
        String expectedResponseAsJson = mapper.writeValueAsString(Collections.singletonList(queryResult));
        assertTrue("The response body does not contain the expected data",
                responseBody.equals(expectedResponseAsJson));
    }

    @Test
    public void createLabResult() throws Exception {
        // Arrange
        String request = mapper.writeValueAsString(CREATE_LAB_RESULT);
        when(labResultService.getLabResults()).thenReturn(LAB_RESULT_LIST);

        // Act
        MvcResult result = mockMvc.perform(
                        post("/lab-results")
                                .contentType("application/json")
                                .content(request)
                                .with(csrf()))
                .andExpect(status().isCreated())
                .andReturn();

        // Assert
        assertTrue("The response body should be empty",
                result.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void getLabResult() throws Exception {
        // Arrange
        when(labResultService.getLabResult(any())).thenReturn(LAB_RESULT);

        // Act
        MvcResult result = mockMvc.perform(
                        get("/lab-results/{labResultId}", UUID_STRING)
                                .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        String responseBody = result.getResponse().getContentAsString();
        String expectedResponseAsJson = mapper.writeValueAsString(LAB_RESULT);
        assertTrue("The response body does not contain the expected data",
                responseBody.equals(expectedResponseAsJson));
    }

    @Test
    public void updateLabResult() throws Exception {
        // Arrange
        String request = mapper.writeValueAsString(CREATE_LAB_RESULT);

        // Act
        MvcResult result = mockMvc.perform(
                        patch("/lab-results/{labResultId}", UUID_STRING)
                                .contentType("application/json")
                                .content(request)
                                .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        assertTrue("The response body should be empty",
                result.getResponse().getContentAsString().isEmpty());
    }

    @Test
    public void deleteLabResult() throws Exception {
        // Arrange

        // Act
        MvcResult result = mockMvc.perform(
                        delete("/lab-results/{labResultId}", UUID_STRING)
                                .with(csrf()))
                .andExpect(status().isNoContent())
                .andReturn();

        // Assert
        assertTrue("The response body should be empty",
                result.getResponse().getContentAsString().isEmpty());
    }
}