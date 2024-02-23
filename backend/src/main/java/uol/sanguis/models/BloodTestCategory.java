package uol.sanguis.models;

import java.util.Objects;

public final class BloodTestCategory {
    private final String id;
    private final String name;
    private final String aliases;
    private final String description;
    private final String speciality;
    private final String unit;
    private final double lowerRange;
    private final double upperRange;

    public BloodTestCategory(String id, String name, String aliases, String description, String speciality,
                             String unit, double lowerRange, double upperRange) {
        this.id = id;
        this.name = name;
        this.aliases = aliases;
        this.description = description;
        this.speciality = speciality;
        this.unit = unit;
        this.lowerRange = lowerRange;
        this.upperRange = upperRange;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAliases() {
        return aliases;
    }

    public String getDescription() {
        return description;
    }

    public String getSpeciality() {
        return speciality;
    }

    public String getUnit() {
        return unit;
    }

    public double getLowerRange() {
        return lowerRange;
    }

    public double getUpperRange() {
        return upperRange;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BloodTestCategory that = (BloodTestCategory) o;

        return Double.compare(lowerRange, that.lowerRange) == 0 &&
                Double.compare(upperRange, that.upperRange) == 0 &&
                Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(aliases, that.aliases) &&
                Objects.equals(description, that.description) &&
                Objects.equals(speciality, that.speciality) &&
                Objects.equals(unit, that.unit);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, aliases, description, speciality, unit, lowerRange, upperRange);
    }

    @Override
    public String toString() {
        return "BloodTestCategory{" +
                "id='" + id + '\'' +
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