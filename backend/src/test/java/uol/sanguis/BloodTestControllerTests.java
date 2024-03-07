package uol.sanguis;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import uol.sanguis.controllers.BloodTestController;
import uol.sanguis.models.QueryResult;
import uol.sanguis.services.BloodTestCategoryService;
import uol.sanguis.services.LabResultService;

import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.util.AssertionErrors.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static uol.sanguis.FakeData.BLOOD_TEST_CATEGORY_LIST;
import static uol.sanguis.FakeData.BLOOD_TEST_DETAILED_RESPONSE_LIST;
import static uol.sanguis.FakeData.UUID_STRING;

@WebMvcTest(BloodTestController.class)
@AutoConfigureMockMvc(addFilters = false)
public class BloodTestControllerTests extends BaseControllerTest {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    BloodTestCategoryService bloodTestCategoryService;

    @MockBean
    LabResultService labResultService;

    @Test
    public void getBloodTestCategories() throws Exception {
        // Arrange
        when(bloodTestCategoryService.getBloodTestCategories()).thenReturn(BLOOD_TEST_CATEGORY_LIST);

        // Act
        MvcResult result = mockMvc.perform(
                        get("/blood-tests/categories")
                                .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        String responseBody = result.getResponse().getContentAsString();
        String expectedResponseAsJson = mapper.writeValueAsString(BLOOD_TEST_CATEGORY_LIST);
        assertTrue("The response body does not contain the expected data",
                responseBody.equals(expectedResponseAsJson));
    }

    @Test
    public void getBloodTests() throws Exception {
        // Arrange
        when(labResultService.getAllDetailedBloodTests()).thenReturn(BLOOD_TEST_DETAILED_RESPONSE_LIST);

        // Act
        MvcResult result = mockMvc.perform(
                        get("/blood-tests")
                                .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        String responseBody = result.getResponse().getContentAsString();
        QueryResult queryResult = new QueryResult<>(BLOOD_TEST_DETAILED_RESPONSE_LIST,
                BLOOD_TEST_DETAILED_RESPONSE_LIST.size(), 0, 20);
        String expectedResponseAsJson = mapper.writeValueAsString(Collections.singletonList(queryResult));
        assertTrue("The response body does not contain the expected data",
                responseBody.equals(expectedResponseAsJson));
    }

    @Test
    public void getBloodTestsByCategory() throws Exception {
        // Arrange
        when(labResultService.getAllDetailedBloodTests()).thenReturn(BLOOD_TEST_DETAILED_RESPONSE_LIST);

        // Act
        MvcResult result = mockMvc.perform(
                        get("/blood-tests/{categoryId}", UUID_STRING)
                                .with(csrf()))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
        String responseBody = result.getResponse().getContentAsString();
        String expectedResponseAsJson = mapper.writeValueAsString(BLOOD_TEST_DETAILED_RESPONSE_LIST);
        assertTrue("The response body does not contain the expected data",
                responseBody.equals(expectedResponseAsJson));
    }
}