package uol.sanguis.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uol.sanguis.models.BloodTest;
import uol.sanguis.models.BloodTestCategory;
import uol.sanguis.models.LabResult;
import uol.sanguis.models.QueryResult;
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

    @GetMapping("/categories")
    public List<BloodTestCategory> getBloodTestCategories() {
        return bloodTestCategoryService.getBloodTestCategories();
    }

    @GetMapping("")
    public List<QueryResult<BloodTest>> getBloodTests() {
        List<LabResult> labResults = labResultService.getLabResults();

        List<BloodTest> result = new ArrayList<>();
        labResults.forEach(l -> result.addAll(l.getTests()));

        QueryResult queryResult = new QueryResult<>(result, result.size(), 0, 20);
        // Temporary fix
        return Arrays.asList(queryResult);
    }
}