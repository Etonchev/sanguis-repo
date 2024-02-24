package uol.sanguis.services;

import org.springframework.stereotype.Service;
import uol.sanguis.entities.BloodTestCategoryEntity;
import uol.sanguis.entities.BloodTestEntity;
import uol.sanguis.entities.LabResultEntity;
import uol.sanguis.models.BloodTest;
import uol.sanguis.models.LabResult;
import uol.sanguis.models.requests.CreateLabResult;
import uol.sanguis.repositories.BloodTestCategoryRepository;
import uol.sanguis.repositories.BloodTestRepository;
import uol.sanguis.repositories.LabResultRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LabResultService {
    private final LabResultRepository labResultRepository;
    private final BloodTestCategoryRepository bloodTestCategoryRepository;
    private final BloodTestRepository bloodTestRepository;
    private final UserService userService;

    public LabResultService(LabResultRepository labResultRepository,
                            BloodTestCategoryRepository bloodTestCategoryRepository,
                            BloodTestRepository bloodTestRepository,
                            UserService userService) {
        this.labResultRepository = labResultRepository;
        this.bloodTestCategoryRepository = bloodTestCategoryRepository;
        this.bloodTestRepository = bloodTestRepository;
        this.userService = userService;
    }

    public List<LabResult> getLabResults() {
        String userId = userService.getAuthenticatedUserId();
        List<LabResultEntity> labResultEntities = labResultRepository.findAllByUserId(userId);

        List<LabResult> labResults = new ArrayList<>();
        for(LabResultEntity entity : labResultEntities) {
            List<BloodTest> bloodTests = entity.getBloodTests().stream()
                    .map(b -> new BloodTest(b.getBloodTestCategory().getId(), b.getValue()))
                    .toList();
            LabResult labResult = new LabResult(entity.getId(), entity.getDate(), entity.getLaboratory(),
                    entity.getPhysician(), entity.getNote(), bloodTests);
            labResults.add(labResult);
        }

        return labResults;
    }

    public LabResult getLabResult(String labResultId) {
        String userId = userService.getAuthenticatedUserId();
        Optional<LabResultEntity> labResultEntity = labResultRepository.findByIdAndUserId(labResultId, userId);
        if (labResultEntity.isEmpty()) {
            throw new RuntimeException("Lab result with the provided id was not found!");
        }

        List<BloodTest> bloodTests = labResultEntity.get().getBloodTests().stream()
                .map(b -> new BloodTest(b.getBloodTestCategory().getId(), b.getValue()))
                .toList();
        LabResult labResult = new LabResult(labResultEntity.get().getId(), labResultEntity.get().getDate(),
                labResultEntity.get().getLaboratory(), labResultEntity.get().getPhysician(),
                labResultEntity.get().getNote(), bloodTests);

        return labResult;
    }

    public void createLabResult(CreateLabResult labResult) {
        String userId = userService.getAuthenticatedUserId();
        LabResultEntity labResultEntity = new LabResultEntity();

        labResultEntity.setDate(labResult.getDate());
        labResultEntity.setLaboratory(labResult.getLaboratory());
        labResultEntity.setPhysician(labResult.getPhysician());
        labResultEntity.setNote(labResult.getNote());
        labResultEntity.setUserId(userId);

        List<BloodTestEntity> bloodTestEntities = new ArrayList<>();
        for (BloodTest bloodTest : labResult.getTests()) {
            Optional<BloodTestCategoryEntity> bloodTestCategoryEntity =
                    bloodTestCategoryRepository.findById(bloodTest.getCategoryId());
            if (bloodTestCategoryEntity.isEmpty()) {
                throw new RuntimeException("Database is corrupted");
            }

            BloodTestEntity bloodTestEntity = new BloodTestEntity(
                    bloodTest.getValue(), bloodTestCategoryEntity.get(), labResultEntity);
            bloodTestEntities.add(bloodTestEntity);
        }
        labResultEntity.setBloodTests(bloodTestEntities);

        labResultRepository.save(labResultEntity);
    }

    public void deleteLabResult(String labResultId) {
        String userId = userService.getAuthenticatedUserId();
        Optional<LabResultEntity> labResultOptional = labResultRepository.findByIdAndUserId(labResultId, userId);
        if (labResultOptional.isEmpty()) {
            throw new RuntimeException("Lab result with the provided id was not found!");
        }

        LabResultEntity labResult = labResultOptional.get();
        bloodTestRepository.deleteAll(labResult.getBloodTests());
        labResultRepository.delete(labResult);
    }
}