package uol.sanguis.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.hibernate.annotations.UuidGenerator;

@Table(name = "blood_tests")
@Entity
public class BloodTestEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @UuidGenerator
    private String id;

    @Column(nullable = false)
    private double value;

    @ManyToOne(cascade = CascadeType.ALL)
    private BloodTestCategoryEntity bloodTestCategory;

    @ManyToOne(cascade = CascadeType.ALL)
    private LabResultEntity labResult;

    public BloodTestEntity() {
    }

    public BloodTestEntity(double value, BloodTestCategoryEntity bloodTestCategory,
                           LabResultEntity labResult) {
        this.value = value;
        this.bloodTestCategory = bloodTestCategory;
        this.labResult = labResult;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BloodTestCategoryEntity getBloodTestCategory() {
        return bloodTestCategory;
    }

    public void setBloodTestCategory(BloodTestCategoryEntity bloodTestCategory) {
        this.bloodTestCategory = bloodTestCategory;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "BloodTestEntity{" +
                "id='" + id + '\'' +
                ", bloodTestCategory=" + bloodTestCategory +
                ", value=" + value +
                '}';
    }
}