package uol.sanguis.models;

public class BloodTest {
    private final String categoryId;
    private final double value;

    public BloodTest(String categoryId, double value) {
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