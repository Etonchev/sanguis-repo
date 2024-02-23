package uol.sanguis.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.UuidGenerator;

@Table(name = "blood_test_categories")
@Entity
public class BloodTestCategoryEntity {
    @Id
    @GeneratedValue(generator = "uuid2")
    @UuidGenerator
    private String id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String aliases;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column
    private String speciality;

    @Column(nullable = false)
    private String unit;

    @Column(nullable = false, name = "lower_range")
    private double lowerRange;

    @Column(nullable = false, name = "upper_range")
    private double upperRange;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAliases() {
        return aliases;
    }

    public void setAliases(String aliases) {
        this.aliases = aliases;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSpeciality() {
        return speciality;
    }

    public void setSpeciality(String speciality) {
        this.speciality = speciality;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getLowerRange() {
        return lowerRange;
    }

    public void setLowerRange(double lowerRange) {
        this.lowerRange = lowerRange;
    }

    public double getUpperRange() {
        return upperRange;
    }

    public void setUpperRange(double upperRange) {
        this.upperRange = upperRange;
    }

    @Override
    public String toString() {
        return "BloodTestCategory{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", aliases='" + aliases + '\'' +
                ", description='" + description + '\'' +
                ", speciality='" + speciality + '\'' +
                ", unit='" + unit + '\'' +
                ", lowerRange=" + lowerRange +
                ", upperRange=" + upperRange +
                '}';
    }
}