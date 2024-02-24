package uol.sanguis.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import uol.sanguis.entities.LabResultEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface LabResultRepository extends JpaRepository<LabResultEntity, String> {
    List<LabResultEntity> findAllByUserId(String userId);
    @Query("SELECT l FROM LabResultEntity l WHERE l.id = ?1 AND l.userId = ?2")
    Optional<LabResultEntity> findByIdAndUserId(String labResultId, String userId);
}