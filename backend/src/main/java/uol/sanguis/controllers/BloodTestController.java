package uol.sanguis.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uol.sanguis.models.BloodTestCategory;
import uol.sanguis.services.BloodTestCategoryService;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/blood-tests")
@RestController
public class BloodTestController {
    private final BloodTestCategoryService bloodTestCategoryService;

    public BloodTestController(BloodTestCategoryService bloodTestCategoryService) {
        this.bloodTestCategoryService = bloodTestCategoryService;
    }

    @GetMapping("/categories")
    public List<BloodTestCategory> getBloodTestCategories() {
        return bloodTestCategoryService.getBloodTestCategories();
    }
}