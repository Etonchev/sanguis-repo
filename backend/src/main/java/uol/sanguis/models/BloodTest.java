package uol.sanguis.models;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class BloodTest {
    private final String categoryId;
    private final double value;

    @JsonCreator
    public BloodTest(@JsonProperty("categoryId") String categoryId,
                     @JsonProperty("value") double value) {
        this.categoryId = categoryId;
        this.value = value;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public double getValue() {
        return value;
    }

    @Override
    public String toString() {
        return "BloodTest{" +
                "categoryId='" + categoryId + '\'' +
                ", value=" + value +
                '}';
    }
}