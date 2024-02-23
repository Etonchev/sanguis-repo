package uol.sanguis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uol.sanguis.entities.BloodTestCategoryEntity;

@Repository
public interface BloodTestCategoryRepository extends JpaRepository<BloodTestCategoryEntity, String> {
}