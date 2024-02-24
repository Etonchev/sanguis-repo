package uol.sanguis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uol.sanguis.entities.BloodTestEntity;

@Repository
public interface BloodTestRepository extends JpaRepository<BloodTestEntity, String> {
}