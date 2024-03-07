package uol.sanguis.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uol.sanguis.models.BloodTest;
import uol.sanguis.models.BloodTestCategory;
import uol.sanguis.models.LabResult;
import uol.sanguis.models.QueryResult;
import uol.sanguis.models.responses.BloodTestDetailedResponse;
import uol.sanguis.services.BloodTestCategoryService;
import uol.sanguis.services.LabResultService;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin("*")
@RequestMapping("/blood-tests")
@RestController
public class BloodTestController {
    private final BloodTestCategoryService bloodTestCategoryService;
    private final LabResultService labResultService;

    public BloodTestController(BloodTestCategoryService bloodTestCategoryService,
                               LabResultService labResultService) {
        this.bloodTestCategoryService = bloodTestCategoryService;
        this.labResultService = labResultService;
    }

    @GetMapping("")
    public List<QueryResult<BloodTestDetailedResponse>> getBloodTests() {
        List<BloodTestDetailedResponse> result = labResultService.getAllDetailedBloodTests();
        QueryResult queryResult = new QueryResult<>(result, result.size(), 0, 20);

        return Arrays.asList(queryResult);
    }

    @GetMapping("/{categoryId}")
    public List<BloodTestDetailedResponse> getBloodTestsByCategory(@PathVariable("categoryId") String categoryId) {
        List<BloodTestDetailedResponse> allBloodTests = labResultService.getAllDetailedBloodTests();
        List<BloodTestDetailedResponse> bloodTestsFilteredByCategory = allBloodTests.stream()
                .filter(b -> b.getCategoryId().equals(categoryId))
                .toList();

        return bloodTestsFilteredByCategory;
    }

    @GetMapping("/categories")
    public List<BloodTestCategory> getBloodTestCategories() {
        return bloodTestCategoryService.getBloodTestCategories();
    }
}