package uol.sanguis.services;

import org.springframework.stereotype.Service;
import uol.sanguis.entities.BloodTestCategoryEntity;
import uol.sanguis.models.BloodTestCategory;
import uol.sanguis.repositories.BloodTestCategoryRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BloodTestCategoryService {
    private final BloodTestCategoryRepository bloodTestCategoryRepository;

    public BloodTestCategoryService(BloodTestCategoryRepository bloodTestCategoryRepository) {
        this.bloodTestCategoryRepository = bloodTestCategoryRepository;
    }

    public List<BloodTestCategory> getBloodTestCategories() {
        List<BloodTestCategoryEntity> entities = bloodTestCategoryRepository.findAll();
        System.out.println((long) entities.size());
        return entities.stream()
                .map(b -> new BloodTestCategory(b.getId(), b.getName(), b.getAliases(), b.getDescription(),
                        b.getSpeciality(), b.getUnit(), b.getLowerRange(), b.getUpperRange()))
                .collect(Collectors.toList());
    }
}